package fi.smartbass.athleticsinfo;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import jakarta.servlet.http.HttpServletRequest;

@RestController
public class AthleticsInfoController {

    private static final Logger logger = LoggerFactory.getLogger(AthleticsInfoController.class);
    private final AthleticsInfoService athleticsInfoService;
    private HttpServletRequest request;

    @Autowired
    public AthleticsInfoController(AthleticsInfoService athleticsInfoService, HttpServletRequest request) {
        this.athleticsInfoService = athleticsInfoService;
        this.request = request;
    }

    @GetMapping("/rag/athletics")
    public Reply getAthleticsInfoAnswer(@RequestParam(value = "query", defaultValue = "Where and when were the 2023 World Championships in Athletics held?") String query) {
        logger.info("User {} from {}", request.getRemoteUser(), request.getRemoteAddr());
        String answer = athleticsInfoService.execute(query);
        logger.info("User query: {}, answer: {}", query, answer);
        return new Reply(answer);
    }
}

class Reply {
    private final String reply;

    public Reply(String reply) {
        this.reply = reply;
    }

    public String getReply() {
        return reply;
    }
}