import HEREMaps from '../../components/map'
import ApiKeyForm from '../../components/ApiKeyForm';
import { useApiKey } from '../../components/ApiKeyContext';
import MButton from '../../components/Button/MButton';

const Home=()=>{
    const { apiKey, updateApiKey } = useApiKey();
    const handleApiKeySubmit = (key) => {
        updateApiKey(key);
        };
    return(
        <>
        <h1>Map Sticker Moving Based on Stored Db gps</h1>
        <h3>ykV0LNTyrAZsQSzEcTasWIm_E2bo8fr5wrKFYaGUQPY</h3>
        <MButton/>
        {!apiKey ? (
                <ApiKeyForm onSubmit={handleApiKeySubmit} />
                   ) : (<div>
                       <p>Input Here Maps Api  : {apiKey}</p>
                       {/* Pass refreshFlag to ComponentB */}
                        <HEREMaps/>
                   </div>
                 
                )}
        </>
    )
}

export default Home;