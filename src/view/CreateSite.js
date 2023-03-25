import { Card } from "../components/atoms/Card";
import { Button } from "../components/atoms/Button";
import { Input } from "../components/atoms/Input";


const CreateSite = () => {
    return (
        <Card>
            <Input size="large" />
            <Button size="large" btnText="Create" />
        </Card>
    )
}

export default CreateSite