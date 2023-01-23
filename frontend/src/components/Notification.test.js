import Notification from "./Notification";
import { render, screen } from "@testing-library/react";

describe("Notification component", () => {
  test("render component", () => {
    render(
      <Notification open={true} autoHideDuration={5000} onClose={() => 1} />
    );

    const element = screen.getByTestId("snackbar");
    expect(element).toBeInTheDocument();
  });
});
