import { FormGroup, Input } from 'reactstrap';

const NoemaFormSelect = (props) => {

    return (
        <FormGroup>
            <Input
                type={props.select || "select"}
                id={props.id}
                name={props.name}
                className={props.className}
                onChange={props.onChange}
                bsSize={props.size}
                disabled={props.disabled ? props.disabled : false}
                innerRef={props.innerRef}
            >
                <option value={props.initialValue}>
                    {props.initialValue}
                </option>
                {props.valueDisplay}
            </Input>
        </FormGroup>
    );
}

export default NoemaFormSelect;