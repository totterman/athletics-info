export function Explanation() {
  return (
    <div className="container h-full py-2 border-b border-slate-300 overflow-y-auto">
      <div className="left">
        <h3 className="bg-slate-100 font-semibold ml-2 mt-2">
          What is the purpose of this web application?
        </h3>
        <div className="mx-2">
          To show how non-public information can be leveraged within an AI application. 
          The process is known as retrieval augmented generation, whereby non-public 
          documents are incorporated into the AI language model's knowledge base.
        </div>
        <h3 className="bg-slate-100 font-semibold ml-2 mt-2">
          What AI/LLM/model/whatever did you use?
        </h3>
        <div className="mx-2">
          The original development was made with Ollama 7B and Mistral running
          locally from a Docker container image. However, this application is
          hosted on Azure, where running huge language model containers comes
          with a cost. Thus, I decided to run this application with Azure
          OpenAI, using the GPT 3.5 Turbo 4k model.
        </div>
        <h3 className="bg-slate-100 font-semibold ml-2 mt-2">
          Did you just say that an AI language model can be run... on our
          local office computers?
        </h3>
        <div className="mx-2">
          Exactly! Good (= expensive) hardware, of course, enhances the user experience. 
          However, the underlying concept is that you can host your AI infrastructure 
          entirely within your secure, closed network. Therefore, there is no need 
          to transmit sensitive data over the internet.
        </div>
        <h3 className="bg-slate-100 font-semibold ml-2 mt-2">
          And the rest of your technology stack? Do we need more data
          scientists?
        </h3>
        <div className="mx-2">
          They may prove useful, should you require further research or 
          if there exists a well-defined business case. However, this particular 
          application is constructed using solely standard enterprise Java components. 
          It consists of a React client and a Spring Boot server, with no additional 
          complexities. Therefore, it should be relatively straightforward to integrate 
          with your existing enterprise solutions, particularly if you are already 
          utilizing Java/Spring.
        </div>
        <h3 className="bg-slate-100 font-semibold ml-2 mt-2">Why athletics?</h3>
        <div className="mx-2">
          Well...for a demonstration, there must necessarily be some novel data 
          that cannot realistically be obtained within an existing language model. 
          The demo data is quite recent, and sourced directly from the English Wikipedia. 
          Actually, it is interesting to follow how the AI struggles with different 
          table formats, when it tries to extract some useful information.
        </div>
        <h3 className="bg-slate-100 font-semibold ml-2 mt-2">
          Will you make a translation?
        </h3>
        <div className="mx-2">
          I am experimenting. Primarily, it is a matter of how much computing power (= money)
          is required.
        </div>
        <h3 className="bg-slate-100 font-semibold ml-2 mt-2">
          Excellent! How can we reach you?
        </h3>
        <div className="mx-2">
          Drop a mail to <mark>petri@smartbass.fi</mark> and expect a prompt answer. That said,
          as a sole proprietor, I sometimes find it impractical to be constantly online.
        </div>
      </div>
    </div>
  );
}
