import { useEffect, useState, useContext } from "react";
import { useForm, Controller } from "react-hook-form";
import {
    Form,
    FormGroup,
    Label,
    Button,
} from 'reactstrap';
import { isEmpty } from 'lodash';
import { DateRange } from "react-date-range";
import NoemaFormText from "../../../Common/NoemaFormText";
import NoemaFormSelect from "../../../Common/NoemaFormSelect";
import styles from './RequestForm.module.scss';
import mockCountries from '../../../static/countries.json'
import { RequestContext } from "../../../contexts/RequestContext";
import NoemaAlert from "../../../Common/NoemaAlert/NoemaAlert";

const RequestForm = (props) => {

    const [errorMessage, setErrorMessage] = useState('');
    const [confirmation, setConfirmation] = useState({ visible: false, message: '' });
    const [dateRanges, setDateRanges] = useState([
        {
            startDate: new Date(),
            endDate: new Date(),
            key: "selection"
        }
    ]);
    const { requestDispatch } = useContext(RequestContext)

    const { register, handleSubmit, control, errors, setValue, watch, reset } = useForm();


    useEffect(() => {
        setConfirmation(confirmation)
        let timer = setTimeout(() => {
            setConfirmation({
                visible: false,
                message: "false"
            })
        }, 3000);
        return () => { clearTimeout(timer) };
    }, [confirmation])


    useEffect(() => {
        if (!isEmpty(errors)) {
            outerLoop:
            for (var key in errors) {
                switch (key) {
                    case "name":
                        setErrorMessage("First Name is required");
                        break outerLoop;

                    case "surname":
                        setErrorMessage("Last Name is required");
                        break outerLoop;

                    case "country":
                        setErrorMessage("Country is required");
                        break outerLoop;

                    case "code":
                        setErrorMessage("Code is required and must be of format XXXX-DDDD");
                        break outerLoop;

                    case "amount":
                        setErrorMessage("Amount is required and must be positive");
                        break outerLoop;

                    case "currency":
                        setErrorMessage("Currency is required");
                        break outerLoop;

                    case "description":
                        setErrorMessage("Description is required and must be limited to 150 characters");
                        break outerLoop;

                    case "validityPeriod":
                        setErrorMessage("Validity Period is required and must be between 1 to 3 years and starting 15 days from today");
                        break outerLoop;
                    default:
                        setErrorMessage("");
                        break outerLoop;
                }
            }
        }
    }, [errors])

    const validateDate = (value) => {

        if (!Array.isArray(value)) {
            let date = new Date();
            date.setDate(date.getDate() + 15);

            let diff = (value.selection.endDate.getTime() - value.selection.startDate.getTime()) / 1000;
            diff /= (60 * 60 * 24);
            const yearsDifference = Math.abs(Math.round(diff / 365.25));

            return value.selection.startDate > date && yearsDifference >= 1 && yearsDifference <= 3
        }
        else
            return false
    }

    const onSubmit = data => {
        data.currency = watch("currency");
        requestDispatch({ type: 'newRequest', value: data })
        reset();
        setErrorMessage('');
        setConfirmation({
            visible: true,
            message: "Your Request has been sent!"
        })
        console.log(data);
    }


    return (
        <Form onSubmit={handleSubmit(onSubmit)} className={styles["form"]}>

            <div className="row">
                <div className="col-lg-6">
                    <div className="row">

                        <div className="col-lg-6">
                            <NoemaFormText
                                type="text"
                                id="name"
                                name="name"
                                placeholder="First name *"
                                className={styles["form-input"]}
                                size="lg"
                                innerRef={register({ required: true })}
                            />
                        </div>

                        <div className="col-lg-6">
                            <NoemaFormText
                                type="text"
                                id="surname"
                                name="surname"
                                placeholder="Last name *"
                                className={styles["form-input"]}
                                size="lg"
                                innerRef={register({ required: true })}
                            />

                        </div>
                    </div>

                    <div className="row">
                        <div className="col-lg-6">
                            <NoemaFormSelect
                                type="select"
                                id="country"
                                name="country"
                                className={styles["form-input"]}
                                size="lg"
                                onChange={() => { mockCountries.opec.includes(watch("country")) && setValue("currency", "US Dollar") }}
                                innerRef={register({ required: true, validate: value => value !== "Country *" })}
                                initialValue="Country *"
                                valueDisplay=
                                {props.countries.map((country, index) =>
                                    <option value={country} key={index}>
                                        {country}
                                    </option>
                                )}
                            />
                        </div>

                        <div className="col-lg-6">
                            <NoemaFormText
                                type="text"
                                id="code"
                                placeholder="Code *"
                                name="code"
                                className={styles["form-input"]}
                                size="lg"
                                innerRef={register({ required: true, pattern: /^[A-Z]{4}-[0-9]{4}$/ })}
                            />


                        </div>

                    </div>
                    <div className="row">
                        <div className="col-lg-6">

                            <NoemaFormText
                                type="number"
                                id="amount"
                                name="amount"
                                placeholder="Amount *"
                                className={styles["form-input"]}
                                size="lg"
                                innerRef={register({ required: true, valueAsNumber: true, validate: (value) => value > 0 })}
                            />
                        </div>
                        <div className="col-lg-6">
                            <NoemaFormSelect
                                type="select"
                                id="currency"
                                name="currency"
                                className={styles["form-input"]}
                                size="lg"
                                disabled={mockCountries.opec.includes(watch("country"))}
                                innerRef={register({ required: true, validate: (value) => value !== "Currency *" })}
                                initialValue="Currency *"
                                valueDisplay=
                                {props.currencies.map((currency, index) =>
                                    <option value={currency.name} key={index}>
                                        {currency.name} - {currency.symbol}
                                    </option>
                                )}
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-12">
                            <NoemaFormText
                                type="textarea"
                                id="description"
                                name="description"
                                placeholder="Description *"
                                className={styles["form-input"]}
                                size="lg"
                                rows="6"
                                innerRef={register({ required: true, maxLength: { value: 150, message: "Description cannot be over 150 characters" } })}
                            />
                        </div>
                    </div>

                </div>
                <div className="col-lg-6">
                    <FormGroup>
                        <Label for="validityPeriod" className={styles["form-label"]}>Validity Period</Label>
                        <Controller
                            defaultValue={dateRanges}
                            control={control}
                            name="validityPeriod"
                            rules={{
                                required: true, validate: validateDate
                            }}
                            render={(
                                { onChange, name, value, ref }
                            ) => (
                                <DateRange
                                    id="validityPeriod"
                                    editableDateInputs={true}
                                    value={value}
                                    ref={ref}
                                    name={name}
                                    className={styles["form-input"]}
                                    onChange={(item) => {
                                        setDateRanges([item.selection]);
                                        onChange(item);
                                    }}
                                    moveRangeOnFirstSelection={false}
                                    ranges={dateRanges}
                                />

                            )}
                        />

                    </FormGroup>
                </div>
            </div>

            <div className="row">
                <div className={'col-lg-9 col-sm-12'}>
                    <div className={errorMessage !== '' ? styles["error-container"] : undefined}>
                        {errorMessage}
                    </div>
                </div>

                <div className={`${styles["button-container"]} col-lg-3 col-sm-12`}>
                    <Button type="reset" size="lg" onClick={() => reset()} className={`${styles["clear-button"]} ${styles["button"]}`}>
                        clear
                    </Button>
                    <Button type="submit" size="lg" className={`${styles["submit-button"]} ${styles["button"]}`}>
                        submit
                    </Button>

                </div>
            </div>

            {confirmation.visible && <NoemaAlert message={confirmation.message} />}

        </Form>
    );
}

export default RequestForm;