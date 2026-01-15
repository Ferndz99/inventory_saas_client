"use client";

import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export interface TemplateAttribute {
    id: number
    custom_attribute: number
    global_attribute: number
    is_required: boolean
    order: number
    default_value: string
    is_active: boolean
    attribute_name: string
    attribute_slug: string
    attribute_type: string
    attribute_unit: string
    attribute_description: string
}

interface TemplateAttributesListProps {
    attributes: TemplateAttribute[];
    maxHeight?: number; // px, opcional
}

export function TemplateAttributesList({
    attributes,
    maxHeight = 260,
}: TemplateAttributesListProps) {
    if (attributes.length === 0) {
        return (
            <div className="text-sm text-ui-secondary text-center py-6">
                Aún no hay atributos asignados
            </div>
        );
    }

    return (
        <div
            className="rounded-lg border bg-white dark:bg-ui-dark"
            style={{ maxHeight }}
        >
            <ul className="divide-y overflow-y-auto px-3"
                style={{ maxHeight }}
            >
                {attributes.map((attr) => (
                    <li
                        key={attr.id}
                        className="flex items-start justify-between gap-4 py-3 text-sm"
                    >
                        {/* INFO */}
                        <div className="space-y-1">
                            <div className="flex items-center gap-2">
                                <span className="font-semibold text-ui-main">
                                    {attr.attribute_name}
                                </span>

                                {!attr.is_active && (
                                    <Badge variant="secondary">
                                        Inactivo
                                    </Badge>
                                )}
                            </div>

                            <p className="text-xs text-ui-secondary">
                                {attr.attribute_type}
                                {attr.attribute_unit &&
                                    ` • ${attr.attribute_unit}`}
                            </p>
                        </div>

                        {/* FLAGS */}
                        <div className="flex flex-col items-end gap-1">
                            {attr.is_required && (
                                <Badge variant="destructive">
                                    Requerido
                                </Badge>
                            )}

                            {attr.default_value && (
                                <span className="text-xs text-ui-secondary">
                                    Default: {attr.default_value}
                                </span>
                            )}
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}
