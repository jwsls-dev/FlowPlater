export function parseXmlToJson(xmlString) {
  function xmlToJson(node) {
    var obj = {};

    // Include attributes with prefix '_'
    if (node.attributes) {
      for (var j = 0; j < node.attributes.length; j++) {
        var attribute = node.attributes.item(j);
        obj["_" + attribute.nodeName] = attribute.nodeValue;
      }
    }

    // Process child elements
    var children = node.childNodes;
    if (children.length === 1 && children[0].nodeType === 3) {
      // Single text node
      return children[0].nodeValue.trim();
    } else {
      for (var i = 0; i < children.length; i++) {
        var child = children[i];

        // Element nodes
        if (child.nodeType === 1) {
          var json = xmlToJson(child);
          if (obj[child.nodeName]) {
            // For multiple children with the same tag, create an array
            if (!Array.isArray(obj[child.nodeName])) {
              obj[child.nodeName] = [obj[child.nodeName]];
            }
            obj[child.nodeName].push(json);
          } else {
            obj[child.nodeName] = json;
          }
        }
      }
    }

    // If the object is empty, return an empty string
    obj = Object.keys(obj).length > 0 ? obj : "";
    return obj;
  }

  var parser = new DOMParser();
  var xml = parser.parseFromString(xmlString, "text/xml"); // Parse the XML string to a DOM
  return xmlToJson(xml.documentElement);
}
