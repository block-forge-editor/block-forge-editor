import { FC, useRef, useState } from "react";

import { X, Plus, Upload, MessageSquare } from "lucide-react";

import { cn } from "@/editor/lib/utils";
import {
  EditorInput,
  EditorButton,
  EditorTextarea,
  ComponentHeader,
} from "@/editor/ui/molecules";
import {
  Avatar,
  AvatarImage,
  AvatarFallback,
} from "@/editor/ui/shadcn/ui/avatar";

type TTestimonialsComponentProps = {
  variant: "primary" | "secondary";
  items: Array<{
    name: string;
    role: string;
    text: string;
    photo: string;
  }>;
  onUpdate: (
    items: Array<{
      name: string;
      role: string;
      text: string;
      photo: string;
    }>,
  ) => void;
  onUpdateWithRerender: (
    items: Array<{
      name: string;
      role: string;
      text: string;
      photo: string;
    }>,
  ) => void;
};

export const TestimonialsComponent: FC<TTestimonialsComponentProps> = ({
  items,
  variant,
  onUpdate,
  onUpdateWithRerender,
}) => {
  const [localItems, setLocalItems] = useState(items);
  const fileInputRefs = useRef(new Map<number, HTMLInputElement>());

  const handleAddItem = () => {
    const newItems = [
      ...localItems,
      {
        name: "",
        role: "",
        photo: "",
        text: "",
        icon: "",
      },
    ];
    setLocalItems(newItems);
    onUpdateWithRerender(newItems);
  };

  const handleRemoveItem = (index: number) => {
    const newItems = localItems.filter((_, i) => i !== index);
    setLocalItems(newItems);
    fileInputRefs.current.delete(index);
    onUpdateWithRerender(newItems);
  };

  const handleItemChange = (
    index: number,
    field: "name" | "role" | "text" | "icon" | "photo",
    value: string,
  ) => {
    const newItems = localItems.map((item, i) =>
      i === index ? { ...item, [field]: value } : item,
    );
    setLocalItems(newItems);
    onUpdate(newItems);
  };

  const handlePhotoUpload = (index: number, file: File) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const newItems = localItems.map((item, i) =>
        i === index ? { ...item, photo: reader.result as string } : item,
      );
      setLocalItems(newItems);
      onUpdateWithRerender(newItems);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="bf-relative bf-group bf-w-full bf-space-y-4">
      <ComponentHeader
        variant={variant}
        title="Testimonials"
        tooltipText="Display customer testimonials with photos and reviews"
      >
        <EditorButton variant="icon" onClick={handleAddItem}>
          <Plus className="bf-size-4 bf-text-gray-600" />
        </EditorButton>
      </ComponentHeader>

      <div className="bf-min-h-[200px]">
        <div className="bf-grid bf-grid-cols-1 bf-md:bf-grid-cols-2 bf-lg:bf-grid-cols-3 bf-gap-4">
          {localItems.map((item, index) => (
            <div
              key={index}
              className={cn(
                "bf-border-b bf-border-r bf-p-2 bf-flex bf-flex-col bf-gap-4 bf-group/item",
              )}
            >
              <div className="bf-flex bf-items-start bf-justify-between bf-gap-4">
                <div className="bf-flex bf-items-center bf-gap-3">
                  <div
                    onClick={() => fileInputRefs.current.get(index)?.click()}
                    className="bf-cursor-pointer bf-transition-opacity bf-hover:bf-opacity-80"
                  >
                    <Avatar className="bf-size-12 bf-rounded-full">
                      <AvatarImage alt={item.name} src={item.photo} />
                      <AvatarFallback>
                        {item.name ? (
                          item.name.slice(0, 2).toUpperCase()
                        ) : (
                          <Upload className="bf-size-4 bf-text-gray-600" />
                        )}
                      </AvatarFallback>
                    </Avatar>
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    className="bf-hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        handlePhotoUpload(index, file);
                      }
                    }}
                    ref={(el) => {
                      if (el) {
                        fileInputRefs.current.set(index, el);
                      } else {
                        fileInputRefs.current.delete(index);
                      }
                    }}
                  />
                  <div className="flex-1">
                    <EditorInput
                      value={item.name}
                      placeholder="Enter name"
                      onChange={(e) =>
                        handleItemChange(index, "name", e.target.value)
                      }
                    />
                    <EditorInput
                      value={item.role}
                      variant="secondary"
                      placeholder="Enter role"
                      onChange={(e) =>
                        handleItemChange(index, "role", e.target.value)
                      }
                    />
                  </div>
                </div>
                <EditorButton
                  variant="secondary"
                  onClick={() => handleRemoveItem(index)}
                >
                  <X className="bf-size-4" />
                </EditorButton>
              </div>
              <div className="bf-flex-1">
                <EditorTextarea
                  rows={3}
                  value={item.text}
                  placeholder="Enter testimonial text"
                  onChange={(e) =>
                    handleItemChange(index, "text", e.target.value)
                  }
                />
              </div>
            </div>
          ))}
        </div>
        {localItems.length === 0 && (
          <div className="bf-flex bf-flex-col bf-items-center bf-justify-center bf-h-[200px] bf-text-gray-400">
            <MessageSquare className="bf-size-8 bf-mb-2" />
            <span>No testimonials yet</span>
          </div>
        )}
      </div>
    </div>
  );
};
