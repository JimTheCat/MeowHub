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

    public void sendPasswordResetEmail(String to, String resetLink) throws MessagingException {
        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message, true);

        helper.setTo(to);
        helper.setSubject("Password Reset Request");
        helper.setText(
                "<p>Hi,</p>" +
                        "<p>You requested to reset your password. Click the link below to reset it:</p>" +
                        "<p><a href='" + resetLink + "'>Reset Password</a></p>" +
                        "<p>This link will expire in 15 minutes.</p>",
                true
        );

        mailSender.send(message);
    }
}

