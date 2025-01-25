package meowhub.backend.shared.mail;

import lombok.extern.slf4j.Slf4j;
import org.springframework.context.annotation.Profile;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
@Slf4j
@Profile("mock-mail")
public class MockMailService extends MailService {
    public MockMailService(JavaMailSender mailSender) {
        super(mailSender);
    }

    @Override
    public void sendPasswordResetEmail(String to, String resetLink) {
        log.info("Email sent to: {}\n\n<p>Hi,</p><p>You requested to reset your password. Click the link below to reset it:</p><p><a href='{}'>Reset Password</a></p><p>This link will expire in 15 minutes.</p>", to, resetLink);
    }
}
