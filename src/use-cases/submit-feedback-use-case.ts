import { MailAdapter } from "../adapters/mail-adapter";
import { FeedbacksRepository } from "../repositories/feedbacks-repository";

interface SubmitFeedbackUseCaseRequest {
  type: string;
  comment: string;
  screenshot?: string;
}

export class SubmitFeedbackUseCase {
  private feedbacksRepository: FeedbacksRepository;

  private mailAdapter: MailAdapter;

  constructor(
    feedbacksRepository: FeedbacksRepository,
    mailAdapter: MailAdapter
  ) {
    this.feedbacksRepository = feedbacksRepository;
    this.mailAdapter = mailAdapter;
  }

  async execute(request: SubmitFeedbackUseCaseRequest) {
    const { type, comment, screenshot } = request;

    if (!type) throw new Error("Type is Invalid");
    if (!comment) throw new Error("Comment is Invalid");

    if (screenshot && !screenshot.startsWith("data:image/png;base64")) {
      throw new Error("Invalid screenshot");
    }

    await this.feedbacksRepository.create({
      type,
      comment,
      screenshot,
    });

    await this.mailAdapter.sendMail({
      subject: "Novo Feedback",
      body: [
        `<div style="font-family: sans-serif; font-size: 16px; color: #111;">`,
        `<p>Tipo de Feedback: ${type}</p>`,
        `<p>Comentário: ${comment}</p>`,
        screenshot ? `<image src="${screenshot}" />` : ``,
        `</div>`,
      ].join("\n"),
    });
  }
}
