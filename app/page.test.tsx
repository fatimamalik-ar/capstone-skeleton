import { describe, it, expect, vi, afterEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Home from "./page";

afterEach(() => vi.restoreAllMocks());

describe("Home page", () => {
  it("renders the heading and the Summarize button", () => {
    render(<Home />);
    expect(
      screen.getByRole("heading", { name: /study notes summarizer/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /summarize/i })
    ).toBeInTheDocument();
  });

  it("shows the summary after clicking Summarize", async () => {
    vi.spyOn(global, "fetch").mockResolvedValue({
      ok: true,
      json: async () => ({
        summary: "Short summary",
        keyPoints: ["Point A"],
        quiz: [{ question: "Q1?", answer: "A1" }],
      }),
    } as Response);

    render(<Home />);
    await userEvent.type(
      screen.getByLabelText(/your notes/i),
      "Some study notes about programming languages"
    );
    await userEvent.click(screen.getByRole("button", { name: /summarize/i }));
    expect(await screen.findByText("Short summary")).toBeInTheDocument();
  });

  it("shows an error message when the API fails", async () => {
    vi.spyOn(global, "fetch").mockResolvedValue({
      ok: false,
      json: async () => ({ error: "Could not summarize right now." }),
    } as Response);

    render(<Home />);
    await userEvent.type(
      screen.getByLabelText(/your notes/i),
      "Some study notes about programming languages"
    );
    await userEvent.click(screen.getByRole("button", { name: /summarize/i }));
    expect(await screen.findByRole("alert")).toHaveTextContent(
      /could not summarize/i
    );
  });
});