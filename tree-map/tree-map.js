/**
 *
 * Implement a `addChild` and map` method on this Tree class, using psuedoclassical instantiation.
 *
 * Map accepts a mapping function as its only argument. It traverses the tree,
 * passing each node's value into the mapping function, and generates a new
 * tree containing the results.
 *
 * So `map` should return a tree with the same structure, and different values,
 * but it should NOT modify the tree that was passed in.
 *
 * Example:
 *   var root1 = new Tree(1);
 *   var branch2 = root1.addChild(2);
 *   var branch3 = root1.addChild(3);
 *   var leaf4 = branch2.addChild(4);
 *   var leaf5 = branch2.addChild(5);
 *   var leaf6 = branch3.addChild(6);
 *   var leaf7 = branch3.addChild(7);
 *   var newTree = root1.map(function (value) {
 *     return value * 2;
 *   })
 *  newTree.value // 2
 *  newTree.children[0].value // 4
 *  newTree.children[1].value // 6
 *  newTree.children[0].children[1].value // 10
 *  newTree.children[1].children[1].value // 14
 *  root1.value // still 1
 */

var Tree = function(value) {
  this.value = value;
  this.children = [];
};

Tree.prototype.addChild = function(child) {
  // your code here
  
  var addTarget = new Tree(child);
  this.children.push(addTarget);
  return addTarget;
};

Tree.prototype.map = function(callback) {
  // your code here

  /*
  var newInstance = new Tree(callback(this.value));

  for (var i=0; i<this.children.length; i=i+1) {
    newInstance.children.push(this.children[i].map(callback));
  }
    
  return newInstance
  */

  function copy(obj) {
    var result = new Tree(obj.value);
    for (var i=0; i< obj.children.length; i=i+1) {
      result.children.push(copy(obj.children[i]))
    }
    return result
  }

  var newInstance = copy(this)
  
  function recursion(recursionTarget) {
    recursionTarget.value = callback(recursionTarget.value)

    for (var i=0; i<recursionTarget.children.length; i=i+1) {
      recursion(recursionTarget.children[i])
    }
  }

  recursion(newInstance)

  return newInstance
  
};

module.exports = Tree;
