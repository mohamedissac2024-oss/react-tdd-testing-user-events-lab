import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "../App";

describe("Newsletter Signup Form", () => {
  test("renders form inputs and button", () => {
    render(<App />);
    expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /sign up/i })).toBeInTheDocument();
  });

  test("updates input values when user types", async () => {
    const user = userEvent.setup();
    render(<App />);

    const nameInput = screen.getByLabelText(/name/i);
    const emailInput = screen.getByLabelText(/email/i);

    await user.type(nameInput, "Mahat");
    await user.type(emailInput, "mahat@example.com");

    expect(nameInput).toHaveValue("Mahat");
    expect(emailInput).toHaveValue("mahat@example.com");
  });

  test("selects interests via checkboxes", async () => {
    const user = userEvent.setup();
    render(<App />);

    const codingCheckbox = screen.getByLabelText(/coding/i);
    await user.click(codingCheckbox);

    expect(codingCheckbox).toBeChecked();
  });

  test("shows success message after submitting", async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.type(screen.getByLabelText(/name/i), "Mahat");
    await user.type(screen.getByLabelText(/email/i), "mahat@example.com");
    await user.click(screen.getByLabelText(/coding/i));
    await user.click(screen.getByRole("button", { name: /sign up/i }));

    expect(
      screen.getByRole("alert", { name: /thank you, mahat!/i })
    ).toBeInTheDocument();
    expect(screen.getByText(/coding/i)).toBeInTheDocument();
  });
});
