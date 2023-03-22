import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/20/solid";
import Image from "next/image";

export default function ProductImages({ images, selectedImage, setSelectedImage }) {
  return (
    <div class="w-full lg:w-1/2 px-4 mb-16 lg:mb-0">
      <div class="flex -mx-4 flex-wrap items-center justify-between lg:justify-start lg:items-start xl:items-center">
        <div class="w-full sm:w-auto min-w-max px-4 text-center flex sm:flex-col items-center justify-center">
          <a
            class="inline-block sm:mb-12 mr-4 sm:mr-0 transform -rotate-90 sm:transform-none hover:text-darkBlueGray-400"
            href="#"
          >
            <ChevronUpIcon
              className=" ml-1 h-8 w-8 flex-shrink-0 text-gray-600 group-hover:text-gray-700"
              aria-hidden="true"
            />
          </a>
          {images.map((image) => {
            return (
              <a
                key={image.thumbnailUrl}
                class="h-30 block mb-4 mr-2 sm:mr-0"
                href="#"
                onClick={() => setSelectedImage(image.image.url)}
              >
                <Image
                  class="h-full w-full"
                  src={image.image.sizes.thumbnail.url}
                  alt=""
                  width={40}
                  height={40}
                />
              </a>
            );
          })}
          <a
            class="inline-block transform -rotate-90 sm:transform-none hover:text-darkBlueGray-400"
            href="#"
          >
            <ChevronDownIcon
              className=" ml-1 h-8 w-8 flex-shrink-0 text-gray-600 group-hover:text-gray-700"
              aria-hidden="true"
            />
          </a>
        </div>
        <div class="w-full sm:w-9/12 px-4">
          <Image
            class="mb-5"
            src={selectedImage}
            alt=""
            width={500}
            height={500}
            priority
          />
          <p class="text-sm text-gray-300">Roll over image to zoom in</p>
        </div>
      </div>
    </div>
  );
}
