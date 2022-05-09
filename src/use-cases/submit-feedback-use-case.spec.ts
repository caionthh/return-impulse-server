/* eslint-disable @typescript-eslint/no-empty-function */
import { SubmitFeedbackUseCase } from "./submit-feedback-use-case";

const createFeedbackSpy = jest.fn();
const sendMailSpy = jest.fn();

describe("Submit Feedback", () => {
  const submitFeedback = new SubmitFeedbackUseCase(
    { create: createFeedbackSpy },
    { sendMail: sendMailSpy }
  );

  it("should be able to submit feedback.", async () => {
    await expect(
      submitFeedback.execute({
        type: "BUG",
        comment: "This is a test",
        screenshot: "data:image/png;base64diuawioduanwodpaowdmp",
      })
    ).resolves.not.toThrow();

    expect(createFeedbackSpy).toHaveBeenCalled();
    expect(sendMailSpy).toHaveBeenCalled();
  });

  it("shouldn't be possible to submit feedback without a type", async () => {
    await expect(
      submitFeedback.execute({
        type: "",
        comment: "This is a test",
        screenshot: "data:image/png;base64diuawioduanwodpaowdmp",
      })
    ).rejects.toThrow();
  });

  it("shouldn't be possible to submit feedback without a comment", async () => {
    await expect(
      submitFeedback.execute({
        type: "BUG",
        comment: "",
        screenshot: "data:image/png;base64diuawioduanwodpaowdmp",
      })
    ).rejects.toThrow();
  });

  it("shouldn't be possible to submit feedback without a valid screenshot", async () => {
    await expect(
      submitFeedback.execute({
        type: "BUG",
        comment: "This is a test",
        screenshot: "test.jpg",
      })
    ).rejects.toThrow();
  });
});
