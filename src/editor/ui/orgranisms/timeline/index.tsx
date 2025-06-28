import type { BlockToolConstructorOptions } from "@editorjs/editorjs";
import { type Root, createRoot } from "react-dom/client";

import { TimelineComponent } from "./timeline-component";

import { getIcon } from "@/editor/lib/icons-manager";
import { BaseBlockTool } from "../base-block-tool";
import { TOOLBOX_TITLE } from "./constants";
import { TTimelineData } from "./types";

export class BlockForgeTimeline extends BaseBlockTool {
  private _events: TTimelineData["events"] = [];
  protected _root: Root | null = null;

  constructor(config: BlockToolConstructorOptions) {
    super(config);
    this._events = config.data?.events || [];
  }

  static get toolbox() {
    return {
      title: TOOLBOX_TITLE,
      icon: getIcon("clock"),
    };
  }

  private _updateData(events: TTimelineData["events"]) {
    this._events = events;
    this.save();
  }

  private _updateDataWithRerender(events: TTimelineData["events"]) {
    this._events = events;
    this.save();
    this._rerender();
  }

  private _createReactContainer(): HTMLElement {
    const reactContainer = document.createElement("div");
    this._root = createRoot(reactContainer);
    this._root.render(
      <TimelineComponent
        events={this._events}
        onUpdate={(events) => {
          this._updateData(events);
        }}
        onUpdateWithRerender={(events) => {
          this._updateDataWithRerender(events);
        }}
      />,
    );

    return reactContainer;
  }

  render() {
    const rootDiv = document.createElement("div");
    rootDiv.className = "bf-flex bf-flex-col bf-gap-4";

    const contentWrapper = document.createElement("div");
    contentWrapper.className = "bf-relative bf-group";

    contentWrapper.appendChild(this._createReactContainer());

    rootDiv.appendChild(contentWrapper);

    this._node = rootDiv;
    return rootDiv;
  }

  private _rerender(): void {
    if (!this._node) return;

    const contentWrapper = this._node.querySelector("div");

    if (!contentWrapper) {
      return;
    }

    const oldContainer = contentWrapper.firstElementChild;

    if (oldContainer) {
      contentWrapper.removeChild(oldContainer);
    }

    contentWrapper.appendChild(this._createReactContainer());
  }

  save(): TTimelineData {
    return {
      events: this._events,
    };
  }

  destroy() {
    if (this._root) {
      this._root.unmount();
    }
  }
}
