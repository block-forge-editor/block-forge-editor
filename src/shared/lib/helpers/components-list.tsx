import type { OutputBlockData } from "@editorjs/editorjs";

import { getIcon } from "./icons";

export const createComponentsList = (blocks: OutputBlockData[]) => {
  const componentsList = document.createElement("div");
  componentsList.className = "flex flex-col flex-wrap gap-2 w-full";

  if (blocks) {
    const maxVisibleItems = 4;
    const totalItems = blocks.length;
    const visibleBlocks = blocks.slice(0, maxVisibleItems);

    visibleBlocks.forEach((block) => {
      const componentItem = document.createElement("div");
      componentItem.className =
        "inline-flex items-center flex-shrink-0 gap-1 px-2 py-1 bg-white border border-gray-100 rounded-lg text-xs w-full";

      let icon = "";
      let label = "";

      switch (block.type) {
        case "header":
          icon = getIcon("heading");
          label = "Заголовок";
          break;
        case "paragraph":
          icon = getIcon("formatSize");
          label = "Текст";
          break;
        case "customLink":
          icon = getIcon("link");
          label = "Ссылка";
          break;
        case "subtitle":
          icon = getIcon("heading");
          label = "Подзаголовок";
          break;
        case "image":
          icon = getIcon("image");
          label = "Изображение";
          break;
        case "table":
          icon = getIcon("table");
          label = "Таблица";
          break;
        case "delimiter":
          icon = getIcon("delimiter");
          label = "Разделитель";
          break;
        case "list":
          icon = getIcon("list");
          label = "Список";
          break;
      }
      const wrapper = document.createElement("div");
      wrapper.className = "flex items-center gap-1 w-full overflow-hidden";
      wrapper.innerHTML = `
        <span class="flex-shrink-0 text-blue-500">${icon}</span>
        <span class="text-gray-800 truncate">${label}</span>
      `;
      componentItem.appendChild(wrapper);
      componentsList.appendChild(componentItem);
    });

    if (totalItems > maxVisibleItems) {
      const remainingCount = totalItems - maxVisibleItems;
      const counterItem = document.createElement("div");
      counterItem.className =
        "inline-flex items-center justify-center flex-shrink-0 px-2 py-1 bg-blue-50 border border-blue-100 rounded-lg text-xs text-blue-600 font-medium";
      counterItem.textContent = `+${remainingCount}`;
      componentsList.appendChild(counterItem);
    }
  }

  return componentsList;
};
