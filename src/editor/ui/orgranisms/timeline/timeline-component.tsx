import { FC, useState } from "react";

import { X, Plus, Clock } from "lucide-react";

import { cn } from "@/editor/lib/font-manager";
import { EditorButton, EditorTextarea } from "@/editor/ui/molecules";
import { ComponentHeader } from "@/editor/ui/molecules/component-header";
import { EditorInput } from "@/editor/ui/molecules/input/editor-input";
import { TOOLBOX_TITLE } from "./constants";
import { TTimelineData } from "./types";

type TTimelineComponentProps = {
  events: TTimelineData["events"];
  onUpdate: (events: TTimelineData["events"]) => void;
  onUpdateWithRerender: (events: TTimelineData["events"]) => void;
};

export const TimelineComponent: FC<TTimelineComponentProps> = ({
  events,
  onUpdate,
  onUpdateWithRerender,
}) => {
  const [localEvents, setLocalEvents] = useState(events);

  const handleAddEvent = () => {
    const newEvents = [
      ...localEvents,
      {
        date: "",
        title: "",
        description: "",
      },
    ];
    setLocalEvents(newEvents);
    onUpdateWithRerender(newEvents);
  };

  const handleRemoveEvent = (index: number) => {
    const newEvents = localEvents.filter((_, i) => i !== index);
    setLocalEvents(newEvents);
    onUpdateWithRerender(newEvents);
  };

  const handleEventChange = (
    index: number,
    field: "date" | "title" | "description",
    value: string,
  ) => {
    const newEvents = localEvents.map((event, i) =>
      i === index ? { ...event, [field]: value } : event,
    );
    setLocalEvents(newEvents);
    onUpdate(newEvents);
  };

  return (
    <div className="bf-relative bf-group bf-w-full bf-space-y-4">
      <ComponentHeader
        title={TOOLBOX_TITLE}
        tooltipText="Create a timeline of events with dates and descriptions"
      >
        <EditorButton
          onClick={handleAddEvent}
          className="bf-rounded-xl bf-p-1 hover:bf-bg-gray-100 bf-transition-colors"
        >
          <Plus className="bf-size-4 bf-text-gray-600" />
        </EditorButton>
      </ComponentHeader>

      <div className={cn("bf-min-h-[200px]")}>
        <div className="bf-flex bf-flex-col bf-gap-4">
          {localEvents.map((event, index) => (
            <div key={index} className="bf-flex bf-gap-4 bf-group/item">
              <div className="bf-flex bf-flex-col bf-items-center">
                <div className="bf-size-3 bf-rounded-full bf-bg-gray-400" />
                {index !== localEvents.length - 1 && (
                  <div className="bf-w-0.5 bf-h-full bf-bg-gray-200" />
                )}
              </div>
              <div className="bf-flex-1">
                <div className="bf-flex bf-items-start bf-justify-between bf-gap-4">
                  <div className="bf-flex-1">
                    <EditorInput
                      type="text"
                      value={event.date}
                      placeholder="Enter date"
                      onChange={(e) =>
                        handleEventChange(index, "date", e.target.value)
                      }
                      className="bf-text-sm custom-scroll bf-font-medium bf-text-gray-600 bf-bg-transparent bf-border-none bf-outline-none bf-w-full bf-rounded-md bf-px-2 bf-py-1 hover:bf-bg-gray-50 bf-transition-colors"
                    />
                    <EditorInput
                      type="text"
                      value={event.title}
                      placeholder="Enter title"
                      onChange={(e) =>
                        handleEventChange(index, "title", e.target.value)
                      }
                      className="bf-text-lg custom-scroll bf-font-medium bf-bg-transparent bf-border-none bf-outline-none bf-w-full bf-mt-1 bf-rounded-md bf-px-2 bf-py-1 hover:bf-bg-gray-50 bf-transition-colors"
                    />
                    <EditorTextarea
                      rows={2}
                      value={event.description}
                      placeholder="Enter description"
                      onChange={(e) =>
                        handleEventChange(index, "description", e.target.value)
                      }
                      className="bf-text-sm custom-scroll bf-text-gray-600 bf-bg-transparent bf-border-none bf-outline-none bf-w-full bf-mt-2 bf-resize-none bf-rounded-md bf-px-2 bf-py-1 hover:bf-bg-gray-50 bf-transition-colors"
                    />
                  </div>
                  <EditorButton
                    onClick={() => handleRemoveEvent(index)}
                    className="bf-p-1 bf-text-gray-500 bf-rounded-md hover:bf-bg-gray-50 bf-opacity-0 group-hover/item:bf-opacity-100 bf-transition-opacity"
                  >
                    <X className="bf-size-4" />
                  </EditorButton>
                </div>
              </div>
            </div>
          ))}
        </div>
        {localEvents.length === 0 && (
          <div className="bf-flex bf-flex-col bf-border-b bf-items-center bf-justify-center bf-h-[200px] bf-text-gray-400">
            <Clock className="bf-size-8 bf-mb-2" />
            <span>No events yet</span>
          </div>
        )}
      </div>
    </div>
  );
};
