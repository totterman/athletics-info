package fi.smartbass.athleticsinfo;

import dev.langchain4j.chain.ConversationalRetrievalChain;
import dev.langchain4j.service.AiServices;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AthleticsInfoService {

    /**
     * Please refer to previous examples for basic context.
     * <p>
     * Advanced RAG in LangChain4j is described here: https://github.com/langchain4j/langchain4j/pull/538
     * <p>
     * This example illustrates the implementation of a more sophisticated RAG application
     * using a technique known as "query compression".
     * Often, a query from a user is a follow-up question that refers back to earlier parts of the conversation
     * and lacks all the necessary details for effective retrieval.
     * For example, consider this conversation:
     * User: What is the legacy of John Doe?
     * AI: John Doe was a...
     * User: When was he born?
     * <p>
     * In such scenarios, using a basic RAG approach with a query like "When was he born?"
     * would likely fail to find articles about John Doe, as it doesn't contain "John Doe" in the query.
     * Query compression involves taking the user's query and the preceding conversation, then asking the LLM
     * to "compress" this into a single, self-contained query.
     * The LLM should generate a query like "When was John Doe born?".
     * This method adds a bit of latency and cost but significantly enhances the quality of the RAG process.
     * It's worth noting that the LLM used for compression doesn't have to be the same as the one
     * used for conversation. For instance, you might use a smaller local model trained for summarization.
     * <p>
     * In this example, we will continue using {@link AiServices},
     * but the same principles apply to {@link ConversationalRetrievalChain}, or you can develop your custom RAG flow.
     */


    private static final Logger logger = LoggerFactory.getLogger(AthleticsInfoService.class);

    private final AthleticsInfoAgent athleticsInfoAgent;

    @Autowired
    public AthleticsInfoService(AthleticsInfoAgent athleticsInfoAgent) {
        this.athleticsInfoAgent = athleticsInfoAgent;
    }

    public String execute(String userQuery) {
        return athleticsInfoAgent.answer(userQuery);
    }

}