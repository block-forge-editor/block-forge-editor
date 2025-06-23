import React, { useState } from "react";
import { BlockForgeEditor } from "../index";
import { TOOL_PRESETS, type ToolPreset } from "../lib/tools";

export const ToolsExample: React.FC = () => {
  const [selectedPreset, setSelectedPreset] = useState<ToolPreset>("basic");
  const [customTools, setCustomTools] = useState<string[]>([]);
  const [showCustomTools, setShowCustomTools] = useState(false);

  const handlePresetChange = (preset: ToolPreset) => {
    setSelectedPreset(preset);
    setCustomTools([]);
  };

  const handleCustomToolToggle = (tool: string) => {
    setCustomTools((prev) =>
      prev.includes(tool) ? prev.filter((t) => t !== tool) : [...prev, tool],
    );
  };

  const getAvailableTools = (): string[] => {
    const presetTools = TOOL_PRESETS[selectedPreset] as readonly string[];
    const allTools = TOOL_PRESETS.full as readonly string[];

    return allTools.filter((tool) => !presetTools.includes(tool));
  };

  const getFinalToolsList = (): string[] => {
    const presetTools = TOOL_PRESETS[selectedPreset] as readonly string[];
    return [...presetTools, ...customTools];
  };

  return (
    <div className="bf-p-6 bf-max-w-6xl bf-mx-auto">
      <h1 className="bf-text-3xl bf-font-bold bf-mb-6 bf-text-center">
        BlockForge Editor - Tools Management Demo
      </h1>

      {/* Контролы для настройки инструментов */}
      <div className="bf-bg-gray-50 bf-p-4 bf-rounded-lg bf-mb-6">
        <h2 className="bf-text-xl bf-font-semibold bf-mb-4">
          Настройка инструментов
        </h2>

        {/* Выбор пресета */}
        <div className="bf-mb-4">
          <label className="bf-block bf-text-sm bf-font-medium bf-mb-2">
            Выберите пресет:
          </label>
          <div className="bf-flex bf-flex-wrap bf-gap-2">
            {Object.keys(TOOL_PRESETS).map((preset) => (
              <button
                key={preset}
                onClick={() => handlePresetChange(preset as ToolPreset)}
                className={`bf-px-3 bf-py-1 bf-rounded bf-text-sm bf-font-medium ${
                  selectedPreset === preset
                    ? "bf-bg-blue-600 bf-text-white"
                    : "bf-bg-white bf-text-gray-700 bf-border bf-border-gray-300 hover:bf-bg-gray-50"
                }`}
              >
                {preset}
              </button>
            ))}
          </div>
        </div>

        {/* Информация о выбранном пресете */}
        <div className="bf-mb-4">
          <h3 className="bf-text-sm bf-font-medium bf-mb-2">
            Инструменты в пресете "{selectedPreset}":
          </h3>
          <div className="bf-flex bf-flex-wrap bf-gap-1">
            {(TOOL_PRESETS[selectedPreset] as readonly string[]).map((tool) => (
              <span
                key={tool}
                className="bf-px-2 bf-py-1 bf-bg-green-100 bf-text-green-800 bf-text-xs bf-rounded"
              >
                {tool}
              </span>
            ))}
          </div>
        </div>

        {/* Дополнительные инструменты */}
        <div className="bf-mb-4">
          <button
            onClick={() => setShowCustomTools(!showCustomTools)}
            className="bf-text-blue-600 bf-text-sm bf-font-medium hover:bf-text-blue-800"
          >
            {showCustomTools ? "Скрыть" : "Показать"} дополнительные инструменты
          </button>

          {showCustomTools && (
            <div className="bf-mt-2">
              <p className="bf-text-sm bf-text-gray-600 bf-mb-2">
                Выберите дополнительные инструменты:
              </p>
              <div className="bf-flex bf-flex-wrap bf-gap-2">
                {getAvailableTools().map((tool) => (
                  <label
                    key={tool}
                    className="bf-flex bf-items-center bf-gap-2 bf-cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={customTools.includes(tool)}
                      onChange={() => handleCustomToolToggle(tool)}
                      className="bf-rounded"
                    />
                    <span className="bf-text-sm">{tool}</span>
                  </label>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Итоговый список инструментов */}
        <div>
          <h3 className="bf-text-sm bf-font-medium bf-mb-2">
            Итоговый набор инструментов:
          </h3>
          <div className="bf-flex bf-flex-wrap bf-gap-1">
            {getFinalToolsList().map((tool) => (
              <span
                key={tool}
                className={`bf-px-2 bf-py-1 bf-text-xs bf-rounded ${
                  (TOOL_PRESETS[selectedPreset] as readonly string[]).includes(
                    tool,
                  )
                    ? "bf-bg-green-100 bf-text-green-800"
                    : "bf-bg-blue-100 bf-text-blue-800"
                }`}
              >
                {tool}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Редактор */}
      <div className="bf-border bf-border-gray-200 bf-rounded-lg bf-overflow-hidden">
        <BlockForgeEditor
          id="tools-example-editor"
          toolPreset={selectedPreset}
          enabledTools={
            customTools.length > 0 ? getFinalToolsList() : undefined
          }
          onSave={(data) => {
            console.log("Saved data:", data);
            alert("Данные сохранены! Проверьте консоль.");
          }}
          onChange={(data) => {
            console.log("Editor changed:", data);
          }}
        />
      </div>

      {/* Информация о lazy loading */}
      <div className="bf-mt-6 bf-bg-blue-50 bf-p-4 bf-rounded-lg">
        <h3 className="bf-text-lg bf-font-semibold bf-mb-2 bf-text-blue-900">
          💡 Lazy Loading в действии
        </h3>
        <p className="bf-text-blue-800 bf-text-sm">
          Инструменты загружаются только когда они нужны. Попробуйте переключить
          пресеты и обратите внимание на индикатор загрузки. Каждый инструмент
          загружается только один раз и кэшируется для последующего
          использования.
        </p>
      </div>
    </div>
  );
};
