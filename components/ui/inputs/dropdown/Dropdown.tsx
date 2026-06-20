"use client";

import { Project } from "@/types/Project.types";
import { Background } from "@/types/Props.types";
import styles from "./Dropdown.module.css";
import { IconChevronDown, IconChevronUp, IconCheck } from "nucleo-sharp";
import { useState } from "react";

type DropdownProps = {
    label?: string;
    background: Background;
} & (
    | {
          type: "broad";
          projects?: Project[];
          project?: never;
          selected: string[];
          onSelectedChange: (selected: string[]) => void;
      }
    | {
          type: "specific";
          project: Project;
          projects?: never;
          selected?: never;
          onSelectedChange?: never;
      }
);

export default function Dropdown(props: DropdownProps) {
    const { background } = props;
    const projects =
        props.type === "broad" ? props.projects : [props.project];

    const [isOpen, setIsOpen] = useState(false);
    const selected = props.type === "broad" ? props.selected : [];
    const onSelectedChange =
        props.type === "broad" ? props.onSelectedChange : () => {};
    const allSlugs = projects?.map((p) => p.slug) ?? [];
    const allSelected =
        allSlugs.length > 0 && allSlugs.every((s) => selected.includes(s));

    if (props.type === "specific") {
        return (
            <div className={styles.dropdown} data-background={background}>
                <input
                    type="hidden"
                    name="project"
                    value={props.project.title}
                />
                <p className={styles.projectLabel}>
                    {props.project.title}
                    <span className="text-meta">
                        {props.project.location}
                    </span>
                </p>
            </div>
        );
    }

    function toggle(slug: string) {
        onSelectedChange(
            selected.includes(slug)
                ? selected.filter((s) => s !== slug)
                : [...selected, slug],
        );
    }

    function toggleAll() {
        onSelectedChange(allSelected ? [] : allSlugs);
    }

    return (
        <div>
            {selected.map((slug) => (
                <input
                    key={slug}
                    type="hidden"
                    name="project"
                    value={projects?.find((p) => p.slug === slug)?.title ?? slug}
                />
            ))}

            <div
                className={styles.dropdown}
                data-background={background}
                onClick={() => setIsOpen(!isOpen)}
            >
                <p>
                    Välj projekt:{" "}
                    {selected.length > 0 && (
                        <span>{selected.length} Valda</span>
                    )}
                </p>
                <div className={styles.chevron}>
                    {isOpen ? (
                        <IconChevronUp size={14} />
                    ) : (
                        <IconChevronDown size={14} />
                    )}
                </div>
            </div>

            {isOpen && (
                <div
                    className={styles.options}
                    data-background={background}
                    onClick={(e) => e.stopPropagation()}
                >
                    <div className={styles.option} onClick={toggleAll}>
                        <input
                            type="checkbox"
                            checked={allSelected}
                            readOnly
                        />
                        <div
                            className={`${styles.checkbox} ${
                                allSelected ? styles.checked : ""
                            }`}
                        >
                            {allSelected && <IconCheck size={16} />}
                        </div>
                        <span className={styles.label}>Välj alla</span>
                    </div>
                    {projects?.map((project) => (
                        <div
                            key={project.slug}
                            className={styles.option}
                            onClick={() => toggle(project.slug)}
                        >
                            <input
                                type="checkbox"
                                checked={selected.includes(project.slug)}
                                readOnly
                            />
                            <div
                                className={`${styles.checkbox}
  ${selected.includes(project.slug) ? styles.checked : ""}`}
                            >
                                {selected.includes(project.slug) && (
                                    <IconCheck size={16} />
                                )}
                            </div>
                            <span className={styles.label}>
                                {project.title} –{" "}
                                <span className="text-meta">
                                    {project.location}
                                </span>
                            </span>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
