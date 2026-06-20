"use client";

import {
    ReactNode,
    useEffect,
    useRef,
    useState,
    createRef,
    type RefObject,
} from "react";
import { createRoot, type Root } from "react-dom/client";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import styles from "./EstateMap.module.css";
import { Background } from "@/types/Props.types";
import { buildMapStyle } from "./buildMapStyle";
import Marker, { type MarkerHandle } from "./Marker";

export type EstateStatus = "planned" | "ongoing" | "completed";

export type Estate = {
    id: string;
    title: string;
    lat: number;
    lng: number;
    label?: string;
    price?: string;
    href?: string;
    status?: EstateStatus;
    isCurrent?: boolean;
    image?: { src: string | object; alt: string };
};

type Props = {
    estates: Estate[];
    children?: ReactNode;
    className?: string;
    background?: Background;
};

type MarkerEntry = {
    root: Root;
    marker: maplibregl.Marker;
    markerRef: RefObject<MarkerHandle | null>;
    container: HTMLDivElement;
};

type GestureHint = "scroll" | "touch";

const STOCKHOLM: [number, number] = [18.07, 59.33];
const FIT_PADDING = 80;
const MAX_ZOOM = 14;
const PAN_PADDING = 16;
const HINT_DURATION_MS = 1600;

export default function EstateMap({
    estates,
    children,
    className,
    background = "default",
}: Props) {
    const wrapperRef = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const mapRef = useRef<maplibregl.Map | null>(null);
    const entriesRef = useRef<Map<string, MarkerEntry>>(new Map());
    const loadedRef = useRef(false);
    const estatesRef = useRef(estates);
    estatesRef.current = estates;

    const [gestureHint, setGestureHint] = useState<GestureHint | null>(
        null,
    );
    // Keep the last hint type so the text doesn't vanish mid-fade-out.
    const lastHintRef = useRef<GestureHint>("scroll");
    const hintTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    function syncMarkers(map: maplibregl.Map, list: Estate[]) {
        const entries = entriesRef.current;
        const nextIds = new Set(list.map((e) => e.id));

        for (const [id, { root, marker }] of entries) {
            if (!nextIds.has(id)) {
                marker.remove();
                setTimeout(() => root.unmount(), 0);
                entries.delete(id);
            }
        }

        if (list.length === 0) return;

        const bounds = new maplibregl.LngLatBounds();

        for (const estate of list) {
            const existing = entries.get(estate.id);

            if (!existing) {
                const container = document.createElement("div");
                container.className = styles.markerContainer;

                const markerRef = createRef<MarkerHandle>();

                const handleTooltipOpen = (tooltipEl: HTMLElement) => {
                    container.style.zIndex = "1";
                    for (const [eid, e] of entriesRef.current) {
                        if (eid !== estate.id) {
                            e.markerRef.current?.close();
                            e.container.style.removeProperty("z-index");
                        }
                    }

                    if (window.innerWidth < 768) {
                        // Pan so the tooltip (above the marker) is centered, not the marker itself.
                        // Project the marker to pixels, shift up by tooltip half-height + gap,
                        // then unproject back to get the lng/lat that should sit at map center.
                        const markerPx = map.project([estate.lng, estate.lat]);
                        const tooltipOffset = 120;
                        const newCenter = map.unproject([
                            markerPx.x,
                            markerPx.y - tooltipOffset,
                        ]);
                        map.easeTo({ center: newCenter, duration: 300 });
                        return;
                    }

                    const mapRect = map
                        .getContainer()
                        .getBoundingClientRect();
                    const tipRect = tooltipEl.getBoundingClientRect();
                    let dx = 0;
                    let dy = 0;

                    if (tipRect.top < mapRect.top + PAN_PADDING) {
                        dy = tipRect.top - mapRect.top - PAN_PADDING;
                    } else if (
                        tipRect.bottom >
                        mapRect.bottom - PAN_PADDING
                    ) {
                        dy = tipRect.bottom - mapRect.bottom + PAN_PADDING;
                    }
                    if (tipRect.left < mapRect.left + PAN_PADDING) {
                        dx = tipRect.left - mapRect.left - PAN_PADDING;
                    } else if (
                        tipRect.right >
                        mapRect.right - PAN_PADDING
                    ) {
                        dx = tipRect.right - mapRect.right + PAN_PADDING;
                    }

                    if (dx !== 0 || dy !== 0)
                        map.panBy([dx, dy], { duration: 300 });
                };

                const handleTooltipClose = () => {
                    container.style.removeProperty("z-index");
                };

                const root = createRoot(container);
                root.render(
                    <Marker
                        ref={markerRef}
                        label={estate.label ?? estate.price}
                        status={estate.status}
                        isCurrent={estate.isCurrent}
                        href={estate.href}
                        image={estate.image}
                        onTooltipOpen={handleTooltipOpen}
                        onTooltipClose={handleTooltipClose}
                    />,
                );

                const marker = new maplibregl.Marker({
                    element: container,
                    anchor: "bottom",
                })
                    .setLngLat([estate.lng, estate.lat])
                    .addTo(map);

                entries.set(estate.id, {
                    root,
                    marker,
                    markerRef,
                    container,
                });
            }

            bounds.extend([estate.lng, estate.lat]);
        }

        if (list.length === 1) {
            map.easeTo({
                center: [list[0].lng, list[0].lat],
                zoom: 14,
                duration: 500,
            });
        } else {
            map.fitBounds(bounds, {
                padding: FIT_PADDING,
                maxZoom: MAX_ZOOM,
                duration: 500,
            });
        }
    }

    // Gesture guard: capture wheel/touch events on the wrapper before MapLibre
    // sees them. stopPropagation blocks MapLibre; no preventDefault means the
    // browser's native page scroll still works.
    useEffect(() => {
        const wrapper = wrapperRef.current;
        if (!wrapper) return;

        const showHint = (type: GestureHint) => {
            lastHintRef.current = type;
            setGestureHint(type);
            clearTimeout(hintTimerRef.current ?? undefined);
            hintTimerRef.current = setTimeout(
                () => setGestureHint(null),
                HINT_DURATION_MS,
            );
        };

        const onWheel = (e: WheelEvent) => {
            if (!e.ctrlKey && !e.metaKey) {
                e.stopPropagation();
                showHint("scroll");
            } else {
                clearTimeout(hintTimerRef.current ?? undefined);
                setGestureHint(null);
            }
        };

        const onTouchStart = (e: TouchEvent) => {
            if (e.touches.length < 2) {
                e.stopPropagation();
                showHint("touch");
            }
        };

        wrapper.addEventListener("wheel", onWheel, {
            capture: true,
            passive: true,
        });
        wrapper.addEventListener("touchstart", onTouchStart, {
            capture: true,
            passive: true,
        });

        return () => {
            wrapper.removeEventListener("wheel", onWheel, {
                capture: true,
            });
            wrapper.removeEventListener("touchstart", onTouchStart, {
                capture: true,
            });
            clearTimeout(hintTimerRef.current ?? undefined);
        };
    }, []);

    useEffect(() => {
        if (!containerRef.current || mapRef.current) return;

        const map = new maplibregl.Map({
            container: containerRef.current,
            style: buildMapStyle({ background }),
            center: STOCKHOLM,
            zoom: 10,
        });

        map.addControl(
            new maplibregl.NavigationControl({ showCompass: false }),
            "bottom-right",
        );

        map.once("load", () => {
            map.resize();
            loadedRef.current = true;
            syncMarkers(map, estatesRef.current);
        });

        mapRef.current = map;

        return () => {
            for (const { root } of entriesRef.current.values())
                setTimeout(() => root.unmount(), 0);
            entriesRef.current.clear();
            map.remove();
            mapRef.current = null;
            loadedRef.current = false;
        };
    }, []);

    useEffect(() => {
        const map = mapRef.current;
        if (!map || !loadedRef.current) return;
        syncMarkers(map, estates);
    }, [estates]);

    const hintText =
        lastHintRef.current === "scroll"
            ? "Håll Ctrl och scrolla för att zooma"
            : "Använd två fingrar för att flytta kartan";

    return (
        <div
            ref={wrapperRef}
            className={`${styles.wrapper}${className ? ` ${className}` : ""}`}
        >
            <div ref={containerRef} className={styles.map} />
            <div
                className={styles.gestureOverlay}
                data-visible={gestureHint !== null || undefined}
                aria-hidden
            >
                {hintText}
            </div>
            {children}
        </div>
    );
}
