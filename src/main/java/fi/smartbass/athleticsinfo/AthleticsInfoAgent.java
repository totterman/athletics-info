package fi.smartbass.athleticsinfo;

import dev.langchain4j.service.SystemMessage;

public interface AthleticsInfoAgent {

    @SystemMessage("""
            You are a helpful assistant answering questions about the 2023 World Athletics
            Championships. Answer briefly and add reasoning to your answers.
            If you do not know the answer, just say that you do not know, do not try to make up an answer.
            Today is {{current_date}}.
            """)
    String answer(String query);
}
