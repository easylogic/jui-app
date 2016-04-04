jui.define("util.data.tree", [], function () {
   var Tree = function () {
        var list = [];


       /**
        *
        * this.convert([{ .... node }], 0);
        *
        * @param t
        * @param depth
        */
       function traverse (t, depth) {

           var len = t.length;

           for(var i = 0; i < len; i++) {
               var node = t[i];
               self.append(depth, node);
               if (node.children && node.children.length) {
                   traverse(node.children, depth+1);
               }
               node.children = null;
               delete node.children ;
           }


       }

       /**
        * get shown list
        *
        * @returns {Array}
        */
       this.toCollapsedList = function () {
           var arr = [];
           for(var i = 0, len = list.length; i < len; i++) {
               var node = list[i];
               arr[arr.length] = node;
               if (this.isCollapsed(i)) {
                   i = this.next(i)-1;
               }
           }

           return arr;
       }

       /**
        * convert to tree structure
        *
        * @returns {Array}
        */
       this.toTree = function () {

           var tree_depth = [];
           var tree = [];

           for(var i = 0, len = list.length; i < len; i++) {
               var node = list[i];

               tree_depth[node.depth] = node;

               if (node.depth == 0) {
                   tree.push(node);
               } else if (node.depth > 0) {
                   var parent = tree_depth[node.depth-1];
                   parent.children = parent.children || [];
                   parent.children.push(node);
               }

           }

           return tree;
       }

       this.convert = function (t) {
           list = [];
           traverse(t, 0);
       };

       this.append = function (depth, data) {
           list[list.length] = { depth : depth, data : data, collapsed : false };
       };

       this.insert = function (index, depth, data) {
           list.splice(index, 0, { depth : depth, data : data, collapsed : false  });
       };

       this.remove = function (index) {
           list.splice(index, 1);
       };

       this.removeChildren = function (index) {
           var startIndex = index;
           var nextIndex = this.next(index);

           if (startIndex + 1 < nextIndex) {
               list.splice(startIndex + 1, nextIndex - startIndex - 1 );
           }
       };

       this.appendChild = function (index, data) {
           var depth = list[index].depth;
           var i = index + 1;
           for(var len = list.length; i < len; i++) {
               if (list[i].depth == depth) {
                   break;
               }
           }

           this.insert(i - 1, depth + 1, data);
       };

       this.prependChild = function (index, data) {
           this.insert(index, depth + 1, data);
       };

       this.get = function (index) {
           return list[index];
       };

       this.length = function () {
           return list.length;
       };

       this.collapse = function (index, isCollapsed) {
           list[index].collapsed = isCollapsed;
       };

       this.expand = function (index) {
           this.collapse(index, false);
       };

       this.isCollapsed = function (index) {
           return list[index].collapsed === true;
       }

       this.parent = function (index) {
           var node = list[index];
           var depth = node.depth;
           var i = index - 1;
           for(; i >= 0; i--) {
               if (list[i].depth > depth) {
                   break;
               }
           }

           return i;
        }

       this.firstChild = function (index) {
           var one = list[index];
           var node = list[index+1];

           if (!node)  return -1;

           if(one.depth > node.depth)  {
               return index+1;
           }

           return -1;

       };

       this.lastChild = function (index) {
           var one = list[index];
           var findDepth = one.depth + 1;
           var start = index + 1;
           var len = this.length();

           var lastIndex = -1;

           for(var i = start; i < len; i++) {

               if (list[i].depth == one.depth) {
                   break;
               }

               if (list[i].depth == findDepth) {
                   lastIndex = i;
               }
           }

           return lastIndex;


       };


       this.next = function (index) {
           var one = list[index];
           var start = index + 1;
           var len = this.length();

           var nextIndex = -1;

           for(var i = start; i < len; i++) {

               if (list[i].depth == one.depth) {
                   nextIndex = i;
                   break;
               }
           }

           return nextIndex;
       };

       this.prev = function (index) {
           var one = list[index];
           var start = index - 1;
           var len = this.length();

           var prevIndex = -1;

           for(var i = start; i >= 0; i--) {

               if (list[i].depth < one.depth) {
                   break;
               }

               if (list[i].depth == one.depth) {
                   prevIndex = i;
                   break;
               }
           }

           return prevIndex;
       }

   };

   return Tree;
});
