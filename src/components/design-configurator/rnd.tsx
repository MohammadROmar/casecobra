import Image from 'next/image';
import { Rnd } from 'react-rnd';

import HandleComponent from '../handle-component';

export type DesignConfiguratorRNDProps = {
  width: number;
  height: number;
  imageUrl: string;
  setDimension: (value: { width: number; height: number }) => void;
  setPosition: (value: { x: number; y: number }) => void;
};

function DesignConfiguratorRND({
  width,
  height,
  imageUrl,
  setDimension,
  setPosition,
}: DesignConfiguratorRNDProps) {
  return (
    <Rnd
      default={{ x: 150, y: 205, width: width / 4, height: height / 4 }}
      lockAspectRatio
      resizeHandleComponent={{
        bottomRight: <HandleComponent />,
        bottomLeft: <HandleComponent />,
        topRight: <HandleComponent />,
        topLeft: <HandleComponent />,
      }}
      onResizeStop={(_, __, ref, ___, { x, y }) => {
        setDimension({
          width: +ref.style.width.slice(0, -2),
          height: +ref.style.height.slice(0, -2),
        });
        setPosition({ x, y });
      }}
      onDragStop={(_, data) => {
        const { x, y } = data;

        setPosition({ x, y });
      }}
      className="border-primary z-[75] border-2"
    >
      <div className="relative size-full">
        <Image
          src={imageUrl}
          fill
          sizes={`${width}px`}
          alt="your image"
          className="select-none"
        />
      </div>
    </Rnd>
  );
}

export default DesignConfiguratorRND;
