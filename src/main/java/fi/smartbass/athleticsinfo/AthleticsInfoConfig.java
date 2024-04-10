package fi.smartbass.athleticsinfo;

import dev.langchain4j.data.document.Document;
import dev.langchain4j.data.document.DocumentParser;
import dev.langchain4j.data.document.DocumentSplitter;
import dev.langchain4j.data.document.loader.FileSystemDocumentLoader;
import dev.langchain4j.data.document.loader.UrlDocumentLoader;
import dev.langchain4j.data.document.parser.TextDocumentParser;
import dev.langchain4j.data.document.splitter.DocumentSplitters;
import dev.langchain4j.data.embedding.Embedding;
import dev.langchain4j.data.segment.TextSegment;
import dev.langchain4j.memory.chat.MessageWindowChatMemory;
import dev.langchain4j.model.azure.AzureOpenAiChatModel;
import dev.langchain4j.model.chat.ChatLanguageModel;
import dev.langchain4j.model.embedding.AllMiniLmL6V2EmbeddingModel;
import dev.langchain4j.model.embedding.EmbeddingModel;
import dev.langchain4j.rag.DefaultRetrievalAugmentor;
import dev.langchain4j.rag.RetrievalAugmentor;
import dev.langchain4j.rag.content.retriever.ContentRetriever;
import dev.langchain4j.rag.content.retriever.EmbeddingStoreContentRetriever;
import dev.langchain4j.service.AiServices;
import dev.langchain4j.store.embedding.EmbeddingStore;
import dev.langchain4j.store.embedding.inmemory.InMemoryEmbeddingStore;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;
import org.springframework.core.io.Resource;

import java.io.IOException;
import java.nio.file.Path;
import java.time.Duration;
import java.util.List;

@Configuration
public class AthleticsInfoConfig {

    private static final Logger logger = LoggerFactory.getLogger(AthleticsInfoConfig.class);

    @Value("classpath:docs/world-athletics-2023-all.txt")
    private Resource all;

    @Bean
    @Primary
    AthleticsInfoAgent athleticsInfoAgent() {

        ChatLanguageModel chatModel = AzureOpenAiChatModel.builder()
                .apiKey(System.getenv("AZURE_OPENAI_API_KEY"))
                .endpoint(System.getenv("AZURE_OPENAI_ENDPOINT"))
                .deploymentName(System.getenv("AZURE_OPENAI_DEPLOYMENT_NAME"))
                .temperature(0.2)
                .logRequestsAndResponses(false)
                .timeout(Duration.ofSeconds(150))
                .build();

        EmbeddingModel embeddingModel = new AllMiniLmL6V2EmbeddingModel();
        EmbeddingStore<TextSegment> generalStore = embed(all, embeddingModel);

        // We will create a CompressingQueryTransformer, which is responsible for compressing
        // the user's query and the preceding conversation into a single, stand-alone query.
        // This should significantly improve the quality of the retrieval process.
        // QueryTransformer queryTransformer = new CompressingQueryTransformer(chatModel);

        ContentRetriever generalRetriever = EmbeddingStoreContentRetriever.builder()
                    .embeddingStore(generalStore)
                    .embeddingModel(embeddingModel)
                    .maxResults(2)
                    .minScore(0.6)
                    .build();

        // The RetrievalAugmentor serves as the entry point into the RAG flow in LangChain4j.
        // It can be configured to customize the RAG behavior according to your requirements.
        // In subsequent examples, we will explore more customizations.
        RetrievalAugmentor retrievalAugmentor = DefaultRetrievalAugmentor.builder()
                // .queryTransformer(queryTransformer)
                .contentRetriever(generalRetriever)
                .build();

        return AiServices.builder(AthleticsInfoAgent.class)
                .chatLanguageModel(chatModel)
                .retrievalAugmentor(retrievalAugmentor)
                .chatMemory(MessageWindowChatMemory.withMaxMessages(5))
                .build();
    }

    private static EmbeddingStore<TextSegment> embed(Resource resource, EmbeddingModel embeddingModel) {
        DocumentParser documentParser = new TextDocumentParser();
        Document document = null;
        try {
            document = UrlDocumentLoader.load(resource.getURL(), documentParser);
        } catch (IOException e) {
            logger.error(e.getMessage());
            return null;
        }
        DocumentSplitter splitter = DocumentSplitters.recursive(1000, 100);
        List<TextSegment> segments = splitter.split(document);

        List<Embedding> embeddings = embeddingModel.embedAll(segments).content();

        EmbeddingStore<TextSegment> embeddingStore = new InMemoryEmbeddingStore<>();
        embeddingStore.addAll(embeddings, segments);
        return embeddingStore;
    }
}
