
import { useMyContext } from '../../components/VariableContext';

const VariableTest = () => {
  const { myVariable } = useMyContext();

  return <div>Received Data: {myVariable}</div>;
};

export default VariableTest;