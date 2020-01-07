"use strict";
require.config({
    baseUrl: 'scripts/',
    paths: {},
    shim: {}
});
// load AMD module main.ts (compiled to main.js)
require(['main'], function (Main) {
    var main = new Main();
    main.run();
});
define("main", ["require", "exports"], function (require, exports) {
    "use strict";
    var Main = /** @class */ (function () {
        function Main() {
        }
        Main.prototype.run = function () {
            this.setTreeControl();
            var toggler = document.getElementsByClassName("caret");
            var i = 0;
            for (var i_1 = 0; i_1 < toggler.length; i_1++) {
                var element = toggler[i_1];
                element.addEventListener("click", function () {
                    var myParentElement = this.parentElement;
                    if (myParentElement != null) {
                        var myNestedItems = myParentElement.querySelector(".nested");
                        if (myNestedItems != null) {
                            myNestedItems.classList.toggle("active");
                        }
                    }
                    // @ts-ignore: NAV Invoke
                    Microsoft.Dynamics.NAV.InvokeExtensibilityMethod('TreeItemClicked', this.id);
                    alert(this.innerHTML + " ID:" + this.id);
                    this.classList.toggle("caret-down");
                });
            }
            var otherElements = document.getElementsByClassName("noncaret");
            for (var i_2 = 0; i_2 < otherElements.length; i_2++) {
                var element = otherElements[i_2];
                element.addEventListener("click", function () {
                    // @ts-ignore: NAV Invoke
                    Microsoft.Dynamics.NAV.InvokeExtensibilityMethod('TreeItemClicked', this.id);
                    alert(this.innerHTML + " ID:" + this.id);
                });
            }
        };
        Main.prototype.setTreeControl = function () {
            var _this = this;
            var myBody = document.getElementsByTagName("body")[0];
            var myNewTree = JSON.parse('[ \
            {"entryNo": 1, "description": "Deutschland", "parentEntryNo": 0}, \
                {"entryNo": 2, "description": "Niedersachsen", "parentEntryNo": 1}, \
                    {"entryNo": 3, "description": "Hannover", "parentEntryNo": 2}, \
                        {"entryNo": 9, "description": "Bothfeld", "parentEntryNo": 3}, \
                        {"entryNo": 10, "description": "Lahe", "parentEntryNo": 3}, \
                        {"entryNo": 11, "description": "Mitte", "parentEntryNo": 3}, \
                    {"entryNo": 4, "description": "Braunschweig", "parentEntryNo": 2}, \
                {"entryNo": 5, "description": "Nordrhein Westfalen", "parentEntryNo": 1}, \
                    {"entryNo": 6, "description": "Dortmund", "parentEntryNo": 5}, \
                    {"entryNo": 7, "description": "Köln", "parentEntryNo": 5}, \
                {"entryNo": 8, "description": "Sachsen", "parentEntryNo": 1} \
            ]');
            var myNewList = document.createElement("ul");
            myNewList.id = "myUL";
            var myNewTreeFirstLevel = myNewTree.filter(this.findChilds, 0);
            myNewTreeFirstLevel.forEach(function (treeElement) {
                var newLiElement = document.createElement("li");
                var newSpanElement = document.createElement("span");
                newSpanElement.id = treeElement.entryNo.toString();
                if (_this.hasChilds(treeElement, myNewTree)) {
                    newSpanElement.className = "caret";
                    newLiElement.appendChild(newSpanElement);
                    _this.addChilds(treeElement, myNewTree, newLiElement);
                }
                else {
                    newSpanElement.className = "noncaret";
                    newLiElement.appendChild(newSpanElement);
                }
                newSpanElement.innerHTML = treeElement.description;
                myNewList.appendChild(newLiElement);
            });
            myBody.appendChild(myNewList);
        };
        Main.prototype.hasChilds = function (element, completeTree) {
            var myNewTreeUnderLevel = completeTree.filter(this.findChilds, element.entryNo);
            return myNewTreeUnderLevel.length > 0;
        };
        Main.prototype.addChilds = function (element, completeTree, currentLiElement) {
            var _this = this;
            var myNewTreeUnderLevel = completeTree.filter(this.findChilds, element.entryNo);
            var newULElement = document.createElement("ul");
            newULElement.className = "nested";
            currentLiElement.appendChild(newULElement);
            myNewTreeUnderLevel.forEach(function (underTreeElement) {
                var newUnderLiElement = document.createElement("li");
                var newUnderSpanElement = document.createElement("span");
                newUnderSpanElement.id = underTreeElement.entryNo.toString();
                newUnderSpanElement.className = "noncaret";
                newUnderSpanElement.innerHTML = underTreeElement.description;
                newUnderLiElement.appendChild(newUnderSpanElement);
                newULElement.appendChild(newUnderLiElement);
                if (_this.hasChilds(underTreeElement, completeTree)) {
                    newUnderSpanElement.className = "caret";
                    _this.addChilds(underTreeElement, completeTree, newUnderLiElement);
                }
            });
        };
        Main.prototype.findChilds = function (element, index, array) {
            var myNumber = this;
            return element.parentEntryNo === myNumber;
        };
        return Main;
    }());
    return Main;
});
//# sourceMappingURL=app.js.map