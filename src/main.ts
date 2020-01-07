class Main{
    constructor() {}
    public run(): void {
        this.setTreeControl();
       
        let toggler = document.getElementsByClassName("caret") as HTMLCollectionOf<HTMLSpanElement>;
        let i : number =  0;
        for (let i = 0; i < toggler.length; i++){
            const element = toggler[i];
            element.addEventListener("click", function() {                
                let myParentElement = this.parentElement;                
                if (myParentElement != null){                    
                    let myNestedItems = myParentElement.querySelector(".nested");
                    if (myNestedItems != null){
                        myNestedItems.classList.toggle("active");
                    }                                        
                } 
                // @ts-ignore: NAV Invoke
                Microsoft.Dynamics.NAV.InvokeExtensibilityMethod('TreeItemClicked', this.id);
                alert(this.innerHTML + " ID:" + this.id);
                this.classList.toggle("caret-down");
            }); 
        }

        let otherElements = document.getElementsByClassName("noncaret") as HTMLCollectionOf<HTMLSpanElement>;
        for (let i = 0; i < otherElements.length; i++){
            const element = otherElements[i];
            element.addEventListener("click", function() {   
                // @ts-ignore: NAV Invoke
                Microsoft.Dynamics.NAV.InvokeExtensibilityMethod('TreeItemClicked', this.id);             
                alert(this.innerHTML + " ID:" + this.id);
            });
        }

    }      

    public setTreeControl() :void {
        let myBody = <HTMLBodyElement>document.getElementsByTagName("body")[0];
        let myNewTree: MyTree[] = JSON.parse('[ \
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
                
        let myNewList = <HTMLUListElement>document.createElement("ul");
        myNewList.id = "myUL";
        
        let myNewTreeFirstLevel: MyTree[] = myNewTree.filter(this.findChilds,0);

        myNewTreeFirstLevel.forEach(treeElement => {
            let newLiElement = <HTMLLIElement>document.createElement("li");            
            let newSpanElement = <HTMLSpanElement>document.createElement("span");
            newSpanElement.id = treeElement.entryNo.toString();
            if (this.hasChilds(treeElement,myNewTree)){
                newSpanElement.className = "caret";    
                newLiElement.appendChild(newSpanElement);
                this.addChilds(treeElement,myNewTree,newLiElement);
            } else {
                newSpanElement.className = "noncaret";
                newLiElement.appendChild(newSpanElement);
            }            
            newSpanElement.innerHTML = treeElement.description;            
            myNewList.appendChild(newLiElement);            
        });                
        
        myBody.appendChild(myNewList);

    } 

    public hasChilds(element : MyTree, completeTree : MyTree[]){
        let myNewTreeUnderLevel: MyTree[] = completeTree.filter(this.findChilds,element.entryNo);
        return myNewTreeUnderLevel.length > 0;
    }    

    public addChilds(element : MyTree, completeTree : MyTree[], currentLiElement :HTMLLIElement){
        let myNewTreeUnderLevel: MyTree[] = completeTree.filter(this.findChilds,element.entryNo);
        let newULElement = <HTMLUListElement>document.createElement("ul");
        newULElement.className = "nested";
        currentLiElement.appendChild(newULElement);
        myNewTreeUnderLevel.forEach(underTreeElement => {
            let newUnderLiElement = <HTMLLIElement>document.createElement("li");
            let newUnderSpanElement = <HTMLSpanElement>document.createElement("span");
            newUnderSpanElement.id = underTreeElement.entryNo.toString();
            newUnderSpanElement.className = "noncaret";
            newUnderSpanElement.innerHTML = underTreeElement.description;
            newUnderLiElement.appendChild(newUnderSpanElement);
            newULElement.appendChild(newUnderLiElement);
            if (this.hasChilds(underTreeElement,completeTree)){
                newUnderSpanElement.className = "caret";
                this.addChilds(underTreeElement,completeTree,newUnderLiElement);
            }
        });

    }

    public findChilds(element : MyTree, index : number, array : MyTree[]) {
        let myNumber = <unknown>this;
        return element.parentEntryNo === myNumber;
    }

    
}

interface MyTree {    
        entryNo: number;
        description: string;
        parentEntryNo: number;    
}

    export = Main;