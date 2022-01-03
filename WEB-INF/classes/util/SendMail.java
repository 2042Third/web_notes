package util;
import java.util.*;
import javax.mail.*;
import javax.mail.internet.*;

public class SendMail {
    protected String hostname = "smtp-mail.outlook.com"; 
    protected String username = "yangyimike@outlook.com"; 
    protected String password = "8b3ea0ce093993d50bf535627a156a737f5253611bf48c6f339e4a1984ab9882"; 
    protected Session session;
    public SendMail() {
        Properties props = new Properties();
        props.put("mail.smtp.auth", "true");
        props.put("mail.smtp.starttls.enable", "true");
        props.put("mail.smtp.host", hostname);
        props.put("mail.smtp.port", "587");
        props.put("mail.debug", "true");
        javax.mail.Authenticator auth = new javax.mail.Authenticator() {
            protected PasswordAuthentication getPasswordAuthentication() {
                return new PasswordAuthentication(username, password);
            }
        };

        session = Session.getInstance(props, auth);
    }

    public int send_test () {
        try {
            MimeMessage msg = new MimeMessage(session);
            msg.setFrom(new InternetAddress("yangyimike@outlook.com"));
            InternetAddress[] address = {new InternetAddress("18604713262@163.com")};
            msg.setRecipients(Message.RecipientType.TO, address);
            msg.setSubject("Jakarta Mail APIs Test");
            msg.addHeader("x-cloudmta-class", "standard");
            msg.addHeader("x-cloudmta-tags", "demo, example");
            msg.setText("Test Message Content, hahhaha!");

            Transport.send(msg);

            System.out.println("[ Send Mail ]Message Sent.");
        } catch (javax.mail.MessagingException ex) {
            throw new RuntimeException(ex);
        }
        return 1;
    }
}
