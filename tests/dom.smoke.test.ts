import { describe, it, expect } from "vitest";

describe("jsdom smoke", () => {
	it("can create and query elements", () => {
		const div = document.createElement("div");
		div.id = "root";
		document.body.appendChild(div);
		div.innerHTML = `<span class="msg">Hello</span>`;
		const el = document.querySelector("#root .msg");
		expect(el).not.toBeNull();
		expect(el!.textContent).toBe("Hello");
	});
});


