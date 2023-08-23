import { useApiKey } from '../../components/ApiKeyContext';
import ApiKeyForm from '../../components/ApiKeyForm';


export default function ShowApi(){
    const { apiKey, updateApiKey } = useApiKey();

    const handleApiKeySubmit = (key) => {
      // Save the API key using the context function
      updateApiKey(key);
    };
    
    return (
        <div>
          <h1>My Next.js App</h1>
          {!apiKey ? (
            <ApiKeyForm onSubmit={handleApiKeySubmit} />
          ) : (
            <p>API Key: {apiKey}</p>
          )}
        </div>
      );
}