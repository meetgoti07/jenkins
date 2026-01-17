Behaviour.specify("A.post", "link.post", 0, function (element) {
  const pendingHref = element.getAttribute("data-post-href");
  if (pendingHref) {
    element.setAttribute("href", pendingHref);
    element.removeAttribute("data-post-href");
  }

  if (element._postLinkHandlerAttached) {
    return;
  }

  if (element.onclick) {
    element.onclick = null;
  }

  var postHandler = function (ev) {
    if (ev) {
      ev.preventDefault();
      ev.stopPropagation();
    }
    var form = document.createElement("form");
    form.setAttribute("method", "POST");
    form.setAttribute("action", element.getAttribute("href"));
    crumb.appendToForm(form);
    document.body.appendChild(form);
    form.submit();
    return false;
  };

  element.addEventListener("click", postHandler, true);
  element._postLinkHandlerAttached = true;
});
