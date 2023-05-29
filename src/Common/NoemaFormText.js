import { FormGroup, Input } from 'reactstrap';

const NoemaFormText = (props) => {

    return (
        <FormGroup>
            <Input
                type={props.type}
                id={props.id}
                name={props.name}
                placeholder={props.placeholder}
                className={props.className}
                bsSize={props.size}
                innerRef={props.innerRef}
                rows={props.rows}
            />
        </FormGroup>
    );
}

export default NoemaFormText;