function updateStringList(strings) {
    const list = document.getElementById("stringList");
    list.innerHTML = "";
    strings.forEach((string) => {
        const listItem = document.createElement("li");
        listItem.className = "string-list-item";
        listItem.textContent = "<" + string + ">";

        const removeBtn = document.createElement("button");
        removeBtn.innerHTML = "<div style='rotate:45deg; scale: 1'>+</div>";
        removeBtn.onclick = function () {
            // Send message to content script to remove string
            chrome.tabs.query(
                { active: true, currentWindow: true },
                function (tabs) {
                    chrome.tabs.sendMessage(tabs[0].id, {
                        action: "removeString",
                        string: string,
                    });
                }
            );
            chrome.tabs.query(
                { active: true, currentWindow: true },
                function (tabs) {
                    chrome.tabs.sendMessage(
                        tabs[0].id,
                        { action: "getStringArray" },
                        function (response) {
                            if (response && response.updatedArray) {
                                localStorage.setItem(
                                    "containsStrings",
                                    JSON.stringify(response.updatedArray)
                                );
                                updateStringList(response.updatedArray);
                            }
                        }
                    );
                }
            );
        };

        listItem.appendChild(removeBtn);
        list.appendChild(listItem);
    });
}

document.addEventListener("DOMContentLoaded", function () {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        var currentTab = tabs[0];
        if (
            currentTab &&
            (currentTab.url.includes(".design.webflow.com") ||
                currentTab.url.includes(".webflow.com/design/"))
        ) {
            // Hide the message and show extension functionality
            document.getElementById("message").style.display = "none";
            document.getElementById("app").style.display = "block";
            // Rest of your code to initialize the popup's functionality
        } else {
            // Show the message and hide/disable other functionality
            document.getElementById("message").style.display = "block";
            document.getElementById("app").style.display = "none";
        }
    });

    document.getElementById("addString").addEventListener("click", function () {
        const newString = document.getElementById("inputString").value;
        if (newString) {
            // Send the new string to the content script
            chrome.tabs.query(
                { active: true, currentWindow: true },
                function (tabs) {
                    chrome.tabs.sendMessage(
                        tabs[0].id,
                        { action: "addString", string: newString },
                        function (response) {
                            localStorage.setItem(
                                "containsStrings",
                                JSON.stringify(response.updatedArray)
                            );
                            updateStringList(response.updatedArray);
                        }
                    );
                }
            );
        }
    });

    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.tabs.sendMessage(
            tabs[0].id,
            { action: "getStringArray" },
            function (response) {
                if (response && response.updatedArray) {
                    localStorage.setItem(
                        "containsStrings",
                        JSON.stringify(response.updatedArray)
                    );
                    updateStringList(response.updatedArray);
                }
            }
        );
    });

    document
        .getElementById("toggleHighlight")
        .addEventListener("change", function () {
            const isChecked = this.checked;
            // Send the toggle status to the content script
            chrome.tabs.query(
                { active: true, currentWindow: true },
                function (tabs) {
                    chrome.tabs.sendMessage(tabs[0].id, {
                        action: "toggleHighlight",
                        status: isChecked,
                    });
                }
            );
        });
});
