package meowhub.backend.chats.config;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.converter.DefaultContentTypeResolver;
import org.springframework.messaging.converter.MappingJackson2MessageConverter;
import org.springframework.messaging.converter.MessageConverter;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.util.MimeTypeUtils;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;

import java.util.List;

@Configuration
@EnableWebSocketMessageBroker
public class WebSocketConfig implements WebSocketMessageBrokerConfigurer {

    @Override
    public void registerStompEndpoints(StompEndpointRegistry registry) {
        registry.addEndpoint("/ws").withSockJS(); //rejestracja websocketa, pod taką ścieżką (na niej będzie nasłuchiwał). W main.js łączymy się do niej w: 26
    }

    @Override
    public void configureMessageBroker(MessageBrokerRegistry registry) {
        registry.enableSimpleBroker("/topic", "/user"); //rejestrujemy prefixy, na których będzie nasłuchiwał broker -> topic przeznaczamy na publiczne, a user na prywatne
        registry.setUserDestinationPrefix("/user"); //ustawiamy prefix dla wiadomości skierowanych do konkretnego użytkownika
        registry.setApplicationDestinationPrefixes("/app"); //prefix dla wiadomości, które mają być obsłużone przez serwer (z @MessageMapping)
    }
}
