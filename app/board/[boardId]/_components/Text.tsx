import { RGBtoCSS } from '@/lib/utils';
import { useMutation } from '@/liveblocks.config';
import { TextLayer } from '@/types/canvas';
import React from 'react'
import ContentEditable, { ContentEditableEvent } from 'react-contenteditable'

interface TextProps {
    id: string;
    layer: TextLayer;
    onPointerDown: (e: React.PointerEvent, id: string) => void;
    selectionColor?: string;
}

const calculateFontSize = (width: number, height: number) => {
    const maxFontSize = 96;
    const scaleFactor = 0.5;
    const fontSizeBasedOnHeight = height * scaleFactor;
    const fontSizeBasedOnWidth = width * scaleFactor;

    return Math.min(
        fontSizeBasedOnHeight,
        fontSizeBasedOnWidth,
        maxFontSize,
    )
}



export const Text = ({ id, layer, onPointerDown, selectionColor }: TextProps) => {

    const { x, y, width, height, fill, value } = layer;

    const updateValue = useMutation(({ storage }, newValue: string) => {
        const liveLayers = storage.get("layers");
        liveLayers.get(id)?.set("value", newValue);
    }, [])

    const handelContentChange = (e: ContentEditableEvent) => {
        updateValue(e.target.value);
    }

    return (
        <foreignObject

            width={width}
            height={height}
            onPointerDown={(e) => onPointerDown(e, id)}
            style={{
                transform: `translateX(${x}px) translateY(${y}px)`,
                outline: selectionColor ? `1px solid ${selectionColor}` : "none"
            }}
        >
            <ContentEditable
                html={value || "Text"}
                onChange={handelContentChange}
                className={"p-0 border-1 h-full w-full flex items-center justify-center text-center drop-shadow-md outline-none"}
                style={{ color: fill ? RGBtoCSS(fill) : "#000", fontSize: calculateFontSize(width, height) }}
            />
        </foreignObject>
    )
}