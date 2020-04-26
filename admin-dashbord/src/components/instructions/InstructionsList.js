import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const InstructionsList = () => {
    const [instructions, setInstructions] = useState([]);

    const fetchData = async () => {
        try {
            const res = await axios.get("http://localhost:3001/instructions");
            setInstructions(res.data.instructions);
        } catch (err) {
            console.log(err);
        }
    };

    const remove = async (e, id) => {
        try {
            const res = await axios.delete(
                `http://localhost:3001/instructions/${id}`
            );

            if (res.status === 202) {
                const updatedInstructions = instructions.filter(
                    (i) => i._id !== id
                );
                setInstructions(updatedInstructions);
            }
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div>
            <div className="text-center mb-4">
                <h1>Instructions</h1>
                <Link to="/instructions/create" className="btn btn-primary">
                    Add New +
                </Link>
            </div>

            {instructions.map((i) => (
                <div key={i._id} className="border text-right">
                    <p className="pr-3 pt-1">
                        <i
                            className="fas fa-trash"
                            style={{
                                color: "red",
                                marginRight: 10,
                                cursor: "pointer"
                            }}
                            onClick={(e) => remove(e, i._id)}
                        ></i>

                        <Link to={`instructions/edit/${i._id}`}>
                            <i
                                className="fas fa-edit"
                                style={{
                                    color: "blue",
                                    marginRight: 10,
                                    cursor: "pointer"
                                }}
                            ></i>
                        </Link>

                        {i.text}
                    </p>
                </div>
            ))}
        </div>
    );
};

export default InstructionsList;
