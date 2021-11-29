import React from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import style from "../styles/form.module.css";
import { Link } from "next/link";

function upload({ snippet }) {
  const { register, handleSubmit, errors, reset } = useForm({
    defaultValues: {
      code: snippet ? snippet.data.code : "",
      language: snippet ? snippet.data.language : "",
      description: snippet ? snippet.data.description : "",
      name: snippet ? snippet.data.name : "",
    },
  });
  const router = useRouter();
  const createSnippet = async (data) => {
    const { code, language, description, name } = data;
    console.log(data);
    try {
      await fetch("/api/createSnippet", {
        method: "POST",
        body: JSON.stringify({ code, language, description, name }),
        headers: {
          "Content-type": "application/json",
        },
      });
      router.push("/");
    } catch (error) {
      console.log(error);
    }
  };
  const updateSnippet = async (data) => {
    const { code, language, description, name } = data;
    const id = snippet.id;
    try {
      await fetch("/api/updateSnippet", {
        method: "PUT",
        body: JSON.stringify({ code, language, description, name, id }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      router.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={style.cont}>
      <form
        className={style.form}
        onSubmit={handleSubmit(snippet ? updateSnippet : createSnippet)}
      >
        <div>
          <label htmlFor="name">Name</label>
          <input
            className={style.input}
            type="text"
            id="name"
            {...register("name", { required: true })}
          />
        </div>
        <div>
          <label className={style.label} htmlFor="language">
            language
          </label>
          <select
            className={style.select}
            type="text"
            id="language"
            {...register("language", { required: true })}
          >
            <option>Javascript</option>
            <option>Html</option>
            <option>CSS</option>
          </select>
        </div>
        <div>
          <label className={style.label} htmlFor="description">
            description
          </label>
          <textarea
            className={style.input}
            rows={7}
            type="text"
            id="description"
            placeholder="snippet description"
            {...register("description", { required: true })}
          />
        </div>
        <div>
          <label className={style.label} htmlFor="code">
            Code
          </label>
          <textarea
            className={style.input}
            rows={8}
            columns={8}
            type="text"
            id="code"
            {...register("code", { required: true })}
            placeholder="background: none;"
          />
        </div>
        <div>
          <button className={style.button}>Submit</button>
          <button className={style.button}>Cancel</button>
        </div>
      </form>
    </div>
  );
}
export default upload;
