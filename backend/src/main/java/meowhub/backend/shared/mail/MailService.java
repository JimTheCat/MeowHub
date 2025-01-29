package meowhub.backend.shared.mail;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Primary;
import org.springframework.context.annotation.Profile;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

@Service
@Primary
@RequiredArgsConstructor
@Profile("!mock-mail")
public class MailService {
    private final JavaMailSender mailSender;

    public void sendPasswordResetEmail(String mailAdress, String login, String resetLink) throws MessagingException {
        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message, true);

        helper.setTo(mailAdress);
        helper.setSubject("Password Reset Request");
        helper.setText(
                "<html>" +
                        "<head>" +
                        "<style>" +
                        "    body { font-family: Arial, sans-serif; background-color: #f4f4f4; margin: 0; padding: 0; }" +
                        "    .email-container { width: 100%; max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); }" +
                        "    .email-header { background-color: #4CAF50; color: #ffffff; padding: 20px; text-align: center; font-size: 24px; font-weight: bold; border-top-left-radius: 8px; border-top-right-radius: 8px; }" +
                        "    .email-body { padding: 30px; color: #333333; font-size: 16px; line-height: 1.6; }" +
                        "    .email-body p { margin: 15px 0; }" +
                        "    .reset-button { display: inline-block; padding: 12px 25px; background-color: #4CAF50; color: #ffffff; text-decoration: none; border-radius: 4px; font-size: 16px; font-weight: bold; text-align: center; transition: background-color 0.3s ease; }" +
                        "    .reset-button:hover { background-color: #45a049; }" +
                        "    .footer { text-align: center; font-size: 12px; color: #888888; padding: 20px; }" +
                        "</style>" +
                        "</head>" +
                        "<body>" +
                        "<div class='email-container'>" +
                        "<div class='email-header'>" +
                        "Reset Your Password" +
                        "</div>" +
                        "<div class='email-body'>" +
                        "<p>Hi," + login + "</p>" +
                        "<p>We received a request to reset your password. Please click the button below to reset it:</p>" +
                        "<p><a href='" + resetLink + "' class='reset-button'>Reset Password</a></p>" +
                        "<p>This link will expire in 15 minutes.</p>" +
                        "</div>" +
                        "<div class='footer'>" +
                        "<p>If you did not request a password reset, please ignore this email.</p>" +
                        " <p>&copy; 2025 MeowHub. All rights reserved.</p>" +
                        "</div>" +
                        "</body>" +
                        "</html>", true
        );


        mailSender.send(message);
    }
}

