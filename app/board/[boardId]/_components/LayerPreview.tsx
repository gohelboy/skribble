import { useStorage } from '@/liveblocks.config';
import { LayerType } from '@/types/canvas';
import React, { memo } from 'react'
import Rectangel from './rectangel';
import { Elipse } from './Elipse';
import { Text } from './Text';


interface LayerPreviewProps {
    id: string;
    onLayerPointerDown: (e: React.PointerEvent, layerId: string) => void;
    selectionColor: string;
}

const LayerPreview = memo(({ id, onLayerPointerDown, selectionColor }: LayerPreviewProps) => {

    const layer = useStorage((root) => root.layers.get(id));
    if (!layer) return

    switch (layer?.type) {
        case LayerType.Text:
            return <Text
                id={id}
                layer={layer}
                onPointerDown={onLayerPointerDown}
                selectionColor={selectionColor}
            />;
        case LayerType.Rectangle:
            return <Rectangel
                id={id}
                layer={layer}
                onPointerDown={onLayerPointerDown}
                selectionColor={selectionColor}
            />;
        case LayerType.Elipse:
            return <Elipse
                id={id}
                layer={layer}
                onPointerDown={onLayerPointerDown}
                selectionColor={selectionColor}
            />;

        default:
            console.warn("Layer type not supported");
            return null;
    }

})

LayerPreview.displayName = "LayerPreview";

export default LayerPreview