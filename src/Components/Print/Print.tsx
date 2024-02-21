import * as React from "react";
import { findDOMNode } from "react-dom";

import { PrintContext } from "./PrintContext";
import type { IPrintContextProps } from "./PrintContext";
import { defaultPrintProps } from "../../Default/defaultPrintProps";
import type { PrintFont } from "../../Type/Type";
import type { IReactToPrintProps } from "../../Type/Type";

export class Print extends React.Component<IReactToPrintProps> {
  private numResourcesToLoad!: number;
  private resourcesLoaded!: (Element | PrintFont | FontFace)[];
  private resourcesErrored!: (Element | PrintFont | FontFace)[];

  static defaultProps = defaultPrintProps;

  public startPrint = (target: HTMLIFrameElement) => {
    const {
      onAfterPrint,
      onPrintError,
      print,
      documentTitle,
    } = this.props;
    setTimeout(() => {
      if (target.contentWindow) {
        target.contentWindow.focus();

        if (print) {
          print(target)
            .then(() => onAfterPrint?.())
            .then(() => this.handleRemoveIframe())
            .catch((error: Error) => {
              if (onPrintError) {
                onPrintError('print', error);
              } else {
                this.logMessages(["An error was thrown by the specified `print` function"]);
              }
            });
        } else {
          if (target.contentWindow.print) {
            const tempContentDocumentTitle = target.contentDocument?.title ?? '';
            const tempOwnerDocumentTitle = target.ownerDocument.title;
            if (documentTitle) {
              target.ownerDocument.title = documentTitle;
              if (target.contentDocument) {
                target.contentDocument.title = documentTitle;
              }
            }

            target.contentWindow.print();
            if (documentTitle) {
              target.ownerDocument.title = tempOwnerDocumentTitle;

              if (target.contentDocument) {
                target.contentDocument.title = tempContentDocumentTitle;
              }
            }
          } else {
            this.logMessages(["Printing for this browser is not currently possible: the browser does not have a `print` method available for iframes."]);
          }

          onAfterPrint?.();
          this.handleRemoveIframe();
        }
      } else {
        this.logMessages(["Printing failed because the `contentWindow` of the print iframe did not load. This is possibly an error with."]);
      }
    }, 500);
  }

  public triggerPrint = (target: HTMLIFrameElement) => {
    const {
      onBeforePrint,
      onPrintError,
    } = this.props;

    if (onBeforePrint) {
      const onBeforePrintOutput = onBeforePrint();
      if (onBeforePrintOutput && typeof onBeforePrintOutput.then === "function") {
        onBeforePrintOutput
          .then(() => {
            this.startPrint(target);
          })
          .catch((error: Error) => {
            if (onPrintError) {
              onPrintError("onBeforePrint", error);
            }
          });
      } else {
        this.startPrint(target);
      }
    } else {
      this.startPrint(target);
    }
  }

  public handleClick(
    _event?: unknown,
    content?: (() => React.ReactInstance | null)
  ) {
    const {
      onBeforeGetContent,
      onPrintError,
    } = this.props;

    if (onBeforeGetContent) {
      const onBeforeGetContentOutput = onBeforeGetContent();
      if (onBeforeGetContentOutput && typeof onBeforeGetContentOutput.then === "function") {
        onBeforeGetContentOutput
          .then(() => this.handlePrint(content))
          .catch((error: Error) => {
            if (onPrintError) {
              onPrintError("onBeforeGetContent", error);
            }
          });
      } else {
        this.handlePrint(content);
      }
    } else {
      this.handlePrint(content);
    }
  }

  public handlePrint = (optionalContent?: (() => React.ReactInstance | null)) => {
    const {
      bodyClass,
      content,
      copyStyles,
      fonts,
      pageStyle,
      nonce,
    } = this.props;

    let contentEl = typeof optionalContent === "function" ? optionalContent() : null;

    if (contentEl && typeof content === "function") {
      this.logMessages([' received a `content` prop and a content param passed the callback return by `useReactToPrint. The `content` prop will be ignored.'], "warning");
    }

    if (!contentEl && typeof content === "function") {
      contentEl = content();
    }

    if (contentEl === undefined) {
      this.logMessages(['To print a functional component ensure it is wrapped with `React.forwardRef`, and ensure the forwarded ref is used. See the README for an example: https://github.com/gregnb/#examples']);
      return;
    }

    if (contentEl === null) {
      this.logMessages(['There is nothing to print because the "content" prop returned "null". Please ensure "content" is renderable before allowing  to be called.']);
      return;
    }

    const printWindow = document.createElement("iframe");
    printWindow.width = `${document.documentElement.clientWidth}px`;
    printWindow.height = `${document.documentElement.clientHeight}px`;
    printWindow.style.position = "absolute";
    printWindow.style.top = `-${document.documentElement.clientHeight + 100}px`;
    printWindow.style.left = `-${document.documentElement.clientWidth + 100}px`;
    printWindow.id = "printWindow";
    printWindow.srcdoc = "<!DOCTYPE html>";

    const contentNodes = findDOMNode(contentEl);

    if (!contentNodes) {
      this.logMessages([' could not locate the DOM node corresponding with the `content` prop']);
      return;
    }

    const clonedContentNodes = contentNodes.cloneNode(true);
    const isText = clonedContentNodes instanceof Text;

    const globalLinkNodes = document.querySelectorAll("link[rel~='stylesheet'], link[as='style']");
    const renderComponentImgNodes = isText ? [] : (clonedContentNodes as Element).querySelectorAll("img");
    const renderComponentVideoNodes = isText ? [] : (clonedContentNodes as Element).querySelectorAll("video");

    const numFonts = fonts ? fonts.length : 0;

    this.numResourcesToLoad =
      globalLinkNodes.length +
      renderComponentImgNodes.length +
      renderComponentVideoNodes.length +
      numFonts;
    this.resourcesLoaded = [];
    this.resourcesErrored = [];

    const markLoaded = (resource: Element | PrintFont | FontFace, errorMessages?: unknown[]) => {
      if (this.resourcesLoaded.includes(resource)) {
        this.logMessages(["Tried to mark a resource that has already been handled", resource], "debug");
        return;
      }

      if (!errorMessages) {
        this.resourcesLoaded.push(resource);
      } else {
        this.logMessages([
          ' was unable to load a resource but will continue attempting to print the page',
          ...errorMessages
        ]);
        this.resourcesErrored.push(resource);
      }

      const numResourcesManaged = this.resourcesLoaded.length + this.resourcesErrored.length;

      if (numResourcesManaged === this.numResourcesToLoad) {
        this.triggerPrint(printWindow);
      }
    };

    printWindow.onload = () => {
      printWindow.onload = null;

      const domDoc = printWindow.contentDocument || printWindow.contentWindow?.document;

      if (domDoc) {
        domDoc.body.appendChild(clonedContentNodes);

        if (fonts) {
          if (printWindow.contentDocument?.fonts){ // && printWindow.contentWindow?.FontFace) {
            fonts.forEach((font) => {
              const fontFace = new FontFace(
                font.family,
                font.source,
                { weight: font.weight, style: font.style }
              );
              printWindow.contentDocument!.fonts.add(fontFace);
              fontFace.loaded
                .then(() => {
                  markLoaded(fontFace);
                })
                .catch((error: Error) => {
                  markLoaded(fontFace, ['Failed loading the font:', fontFace, 'Load error:', error]);
                });
            });
          } else {
            fonts.forEach(font => markLoaded(font)); // Pretend we loaded the fonts to allow printing to continue
            this.logMessages([' is not able to load custom fonts because the browser does not support the FontFace API but will continue attempting to print the page']);
          }
        }

        const defaultPageStyle = typeof pageStyle === "function" ? pageStyle() : pageStyle;

        if (typeof defaultPageStyle !== 'string') {
          this.logMessages([` expected a "string" from \`pageStyle\` but received "${typeof defaultPageStyle}". Styles from \`pageStyle\` will not be applied.`]); // eslint-disable-line max-len
        } else {
          const styleEl = domDoc.createElement("style");
          if (nonce) {
            styleEl.setAttribute("nonce", nonce);
            domDoc.head.setAttribute("nonce", nonce);
          }
          styleEl.appendChild(domDoc.createTextNode(defaultPageStyle));
          domDoc.head.appendChild(styleEl);
        }

        if (bodyClass) {
          domDoc.body.classList.add(...bodyClass.split(" "));
        }

        if (!isText) {
          const srcCanvasEls = isText ? [] : (contentNodes as Element).querySelectorAll("canvas");
          const targetCanvasEls = domDoc.querySelectorAll("canvas");

          for (let i = 0; i < srcCanvasEls.length; ++i) {
            const sourceCanvas = srcCanvasEls[i];

            const targetCanvas = targetCanvasEls[i];
            const targetCanvasContext = targetCanvas.getContext("2d");

            if (targetCanvasContext) {
              targetCanvasContext.drawImage(sourceCanvas, 0, 0);
            }
          }

          for (let i = 0; i < renderComponentImgNodes.length; i++) {
            const imgNode = renderComponentImgNodes[i];
            const imgSrc = imgNode.getAttribute("src");

            if (!imgSrc) {
              markLoaded(imgNode, ['Found an <img> tag with an empty "src" attribute. This prevents pre-loading it. The <img> is:', imgNode]);
            } else {
              const img = new Image();
              img.onload = () => markLoaded(imgNode);
              img.onerror = (_event, _source, _lineno, _colno, error) => markLoaded(imgNode, ["Error loading <img>", imgNode, "Error", error]);
              img.src = imgSrc;
            }
          }

          // Pre-load videos
          for (let i = 0; i < renderComponentVideoNodes.length; i++) {
            const videoNode = renderComponentVideoNodes[i];
            videoNode.preload = 'auto'; // Hint to the browser that it should load this resource

            const videoPoster = videoNode.getAttribute('poster')
            if (videoPoster) {
              const img = new Image();
              img.onload = () => markLoaded(videoNode);
              img.onerror = (_event, _source, _lineno, _colno, error) => markLoaded(videoNode, ["Error loading video poster", videoPoster, "for video", videoNode, "Error:", error]);
              img.src = videoPoster;
            } else {
              if (videoNode.readyState >= 2) { // Check if the video has already loaded a frame
                markLoaded(videoNode);
              } else {
                videoNode.onloadeddata = () => markLoaded(videoNode);

                videoNode.onerror = (_event, _source, _lineno, _colno, error) => markLoaded(videoNode, ["Error loading video", videoNode, "Error", error]);
                videoNode.onstalled = () => markLoaded(videoNode, ["Loading video stalled, skipping", videoNode]);
              }
            }
          }

          const inputSelector = 'input';
          const originalInputs = (contentNodes as HTMLElement).querySelectorAll(inputSelector);
          const copiedInputs = domDoc.querySelectorAll(inputSelector);
          for (let i = 0; i < originalInputs.length; i++) {
            copiedInputs[i].value = originalInputs[i].value;
          }

          const checkedSelector = 'input[type=checkbox],input[type=radio]';
          const originalCRs = (contentNodes as HTMLElement).querySelectorAll(checkedSelector);
          const copiedCRs = domDoc.querySelectorAll(checkedSelector);
          for (let i = 0; i < originalCRs.length; i++) {
            (copiedCRs[i] as HTMLInputElement).checked =
              (originalCRs[i] as HTMLInputElement).checked;
          }

          const selectSelector = 'select';
          const originalSelects = (contentNodes as HTMLElement).querySelectorAll(selectSelector);
          const copiedSelects = domDoc.querySelectorAll(selectSelector);
          for (let i = 0; i < originalSelects.length; i++) {
            copiedSelects[i].value = originalSelects[i].value;
          }
        }

        if (copyStyles) {
          const styleAndLinkNodes = document.querySelectorAll("style, link[rel~='stylesheet'], link[as='style']");

          for (let i = 0, styleAndLinkNodesLen = styleAndLinkNodes.length; i < styleAndLinkNodesLen; ++i) {
            const node = styleAndLinkNodes[i];

            if (node.tagName.toLowerCase() === 'style') { // <style> nodes
              const newHeadEl = domDoc.createElement(node.tagName);
              const sheet = (node as HTMLStyleElement).sheet as CSSStyleSheet;
              if (sheet) {
                let styleCSS = "";
                try {
                  const cssLength = sheet.cssRules.length;
                  for (let j = 0; j < cssLength; ++j) {
                    if (typeof sheet.cssRules[j].cssText === "string") {
                      styleCSS += `${sheet.cssRules[j].cssText}\r\n`;
                    }
                  }
                } catch (error) {
                  this.logMessages([`A stylesheet could not be accessed. This is likely due to the stylesheet having cross-origin imports, and many browsers block script access to cross-origin stylesheets. See https://github.com/gregnb//issues/429 for details. You may be able to load the sheet by both marking the stylesheet with the cross \`crossorigin\` attribute, and setting the \`Access-Control-Allow-Origin\` header on the server serving the stylesheet. Alternatively, host the stylesheet on your domain to avoid this issue entirely.`, node], 'warning');
                }

                newHeadEl.setAttribute("id", `-${i}`);
                if (nonce) {
                  newHeadEl.setAttribute("nonce", nonce);
                }
                newHeadEl.appendChild(domDoc.createTextNode(styleCSS));
                domDoc.head.appendChild(newHeadEl);
              }
            } else {

              if (node.getAttribute("href")) {
                if (!node.hasAttribute("disabled")) {
                  const newHeadEl = domDoc.createElement(node.tagName);

                  for (let j = 0, attrLen = node.attributes.length; j < attrLen; ++j) {
                    const attr = node.attributes[j];
                    if (attr) {
                      newHeadEl.setAttribute(attr.nodeName, attr.nodeValue || "");
                    }
                  }

                  newHeadEl.onload = () => markLoaded(newHeadEl);
                  newHeadEl.onerror = (_event, _source, _lineno, _colno, error) => markLoaded(newHeadEl, ["Failed to load", newHeadEl, "Error:", error]);
                  if (nonce) {
                    newHeadEl.setAttribute("nonce", nonce);
                  }
                  domDoc.head.appendChild(newHeadEl);
                } else {
                  this.logMessages(['`` encountered a <link> tag with a `disabled` attribute and will ignore it. Note that the `disabled` attribute is deprecated, and some browsers ignore it. You should stop using it. https://developer.mozilla.org/en-US/docs/Web/HTML/Element/link#attr-disabled. The <link> is:', node], 'warning');
                  markLoaded(node);
                }
              } else {
                this.logMessages(['`` encountered a <link> tag with an empty `href` attribute. In addition to being invalid HTML, this can cause problems in many browsers, and so the <link> was not loaded. The <link> is:', node], 'warning');
                markLoaded(node);
              }
            }
          }
        }
      }

      if (this.numResourcesToLoad === 0 || !copyStyles) {
        this.triggerPrint(printWindow);
      }
    };

    this.handleRemoveIframe(true);

    document.body.appendChild(printWindow);
  }

  public handleRemoveIframe = (force?: boolean) => {
    const {
      removeAfterPrint,
    } = this.props;

    if (force || removeAfterPrint) {
      const documentPrintWindow = document.getElementById("printWindow");
      if (documentPrintWindow) {
        document.body.removeChild(documentPrintWindow);
      }
    }
  }

  public logMessages = (messages: unknown[], level: 'error' | 'warning' | 'debug' = 'error') => {
    const {
      suppressErrors,
    } = this.props;

    if (!suppressErrors) {
      if (level === 'error') {
        console.error(messages);
      } else if (level === 'warning') {
        console.warn(messages);
      } else if (level === 'debug') {
        console.debug(messages);
      }
    }
  }

  public render() {
    const {
      children,
      trigger,
    } = this.props;

    if (trigger) {
      return React.cloneElement(trigger(), {
        onClick: this.handleClick.bind(this),
      });
    } else {
      if (!PrintContext) {
        this.logMessages([' requires React ^16.3.0 to be able to use "PrintContext"']);

        return null;
      }

      const value = {
        handlePrint: this.handleClick.bind(this)
      };

      return (
        <PrintContext.Provider value={value as IPrintContextProps}>
          {children}
        </PrintContext.Provider>
      );
    }
  }
}