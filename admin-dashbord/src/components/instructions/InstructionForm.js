import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import axios from "axios";

const InstructionForm = () => {
    const { id } = useParams();

    const [instruction, setInstruction] = useState({ text: "" });
    const history = useHistory();
    const [title, setTitle] = useState("");

    const fetchInstruction = async () => {
        try {
            const res = await axios.get(
                `http://localhost:3001/instructions/${id}`
            );

            if (res.status === 200) {
                setInstruction(res.data.instruction);
                setTitle("Update");
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        if (id) {
            fetchInstruction();
        } else {
            setTitle("Create");
        }
    }, [id]);

    const changeHandler = (e) => {
        setInstruction({ ...instruction, text: e.target.value });
    };

    const submitHandler = async (e) => {
        e.preventDefault();

        try {
            if (instruction._id) {
                const res = await axios.patch(
                    `http://localhost:3001/instructions/${instruction._id}`,
                    {
                        instruction
                    }
                );

                if (res.status === 204) {
                    history.push("/instructions");
                }
            } else {
                const res = await axios.post(
                    "http://localhost:3001/instructions",
                    { instruction }
                );

                if (res.status === 201) {
                    history.push("/instructions");
                }
            }
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div>
            <h1>{title}</h1>
            <hr />

            <form onSubmit={submitHandler}>
                <div className="form-group">
                    <label className="">Instruction Text</label>
                    <textarea
                        className="form-control"
                        value={instruction.text}
                        onChange={changeHandler}
                        rows="4"
                        cols="10"
                    />
                </div>

                <button className="btn btn-primary" type="submit">
                    {title}
                </button>
            </form>
        </div>
    );
};

export default InstructionForm;
