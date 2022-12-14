import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import { LoadingButton } from "@mui/lab";
import { Box, Button, Grid } from "@mui/material";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { CloudinaryUnsigned } from "puff-puff/CKEditor";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import newsAPI from "../actions/news";
import Spinner from "./Loading/Spinner";
import RenderForm from "./RenderForm";

const CkEditor = ({ forms, id }) => {
  const [file, setFile] = useState();
  const [html, setHtml] = useState("");
  const { user } = useSelector((state) => state.Auth);
  const queryClient = useQueryClient();
  // const news = queryClient.getQueryData(["tin-tuc"]);
  const { data: news } = useQuery(["tin-tuc"], newsAPI.getNews);
  const router = useRouter();

  const { data, isLoading } = useQuery([`chi-tiet-news`, id], () => {
    if (id && id !== "them") {
      return newsAPI.getDetailNews(id.toString());
    }
  });

  function imagePluginFactory(editor) {
    editor.plugins.get("FileRepository").createUploadAdapter = (loader) => {
      return new CloudinaryUnsigned(
        loader,
        process.env.NEXT_PUBLIC_UPLOAD_NAME,
        process.env.NEXT_PUBLIC_UPLOAD_PRESET,
        [160, 500, 1000, 1052]
      );
    };
  }

  useEffect(() => {
    return () => file && URL.revokeObjectURL(file.preview);
  }, [file]);

  const {
    control,
    formState: { errors },
    setValue,
    handleSubmit,
    getValues,
  } = useForm({
    defaultValues: {
      title: "",
      status: true,
      category: "",
      description: "",
      slug: "",
    },
  });

  useEffect(() => {
    if (data) {
      setValue("title", data.title);
      setValue("description", data.description);
      setValue("status", data.status);
      setValue("category", data.category._id);
      setValue("slug", data.slug);
      setFile({ preview: data.avatar });
      setHtml(data.html);
    }
  }, [data]);

  const { mutate: addNews, isLoading: loadingAdd } = useMutation(
    newsAPI.addNews,
    {
      onSuccess: (result) => {
        queryClient.setQueryData(["tin-tuc"], [...news, result]);

        toast("Th??m th??nh c??ng!", {
          icon: "????",
        });

        router.push("/admin/tin-tuc");
      },
      onError: (err) => {
        console.log(err);
        toast.error(err.message);
      },
    }
  );

  const { mutate: updateNews, isLoading: loadingUpdate } = useMutation(
    newsAPI.updateNews,
    {
      onSuccess: (result) => {
        const newNews = news.map((item) => {
          if (item._id === id.toString()) {
            return { ...result };
          }
          return item;
        });

        queryClient.setQueriesData(["tin-tuc"], newNews);
        toast("C???p nh???t th??nh c??ng!", {
          icon: "????",
        });
        router.push("/admin/tin-tuc");
      },
      onError: (err) => {
        console.log(err);
        toast.error(err.message);
      },
    }
  );

  const handleAdd = async (data) => {
    if (!file) {
      return toast.error("B???n ch??a ch???n ???nh n???n!");
    }

    if (!html) {
      return toast.error("B???n ch??a nh???p chi ti???t news!");
    }

    let image = "";
    if (file) {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", process.env.NEXT_PUBLIC_UPLOAD_PRESET);
      const response = await newsAPI.uploadImage(formData);
      image = response.data.url;
    }

    addNews({ ...data, avatar: image, html: html, author: user._id });
  };

  const handleUpdate = async (dataForm) => {
    if (!file) {
      return toast.error("B???n ch??a ch???n ???nh n???n!");
    }

    if (!html) {
      return toast.error("B???n ch??a nh???p chi ti???t news!");
    }

    let image = data.avatar || "";
    if (file.preview !== image) {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", process.env.NEXT_PUBLIC_UPLOAD_PRESET);
      const response = await newsAPI.uploadImage(formData);
      image = response.data.url;
      console.log(111);
    }

    updateNews({
      ...dataForm,
      avatar: image,
      html: html,
      author: user._id,
      _id: data._id,
    });
  };

  if (loadingAdd || loadingUpdate) {
    return <Spinner />;
  }

  return (
    <>
      {file && file.preview && (
        <Box mt={2}>
          <img
            style={{
              width: "300px",
              margin: "0px auto",
              borderRadius: "10px",
              marginLeft: "16px",
            }}
            src={file.preview}
            alt=''
          />
        </Box>
      )}

      <Grid
        container
        spacing={2}
        mt={2}
        sx={{ mx: "auto", width: "100%" }}
        pb={5}
      >
        {forms.map((item, index) => {
          return (
            <Grid item xs={12} md={6} key={index}>
              <RenderForm data={item} control={control} errors={errors} />
            </Grid>
          );
        })}
        <Grid item xs={12} md={6}>
          <Button
            size='large'
            color='primary'
            variant='contained'
            component='label'
          >
            Ch???n ???nh n???n
            <input
              hidden
              accept='image/*'
              onChange={(e) => {
                const file = e.target.files[0];
                const preview = URL.createObjectURL(file);
                file.preview = preview;

                setFile(file);
              }}
              multiple
              type='file'
            />
          </Button>
        </Grid>

        <Grid item xs={12}>
          <CKEditor
            editor={ClassicEditor}
            config={{
              extraPlugins: [imagePluginFactory],
              // toolbar: {
              //   items: [
              //     "heading",
              //     "|",
              //     "fontfamily",
              //     "fontsize",
              //     "|",
              //     "alignment",
              //     "|",
              //     "fontColor",
              //     "fontBackgroundColor",
              //     "|",
              //     "bold",
              //     "italic",
              //     "strikethrough",
              //     "underline",
              //     "subscript",
              //     "superscript",
              //     "|",
              //     "link",
              //     "|",
              //     "outdent",
              //     "indent",
              //     "|",
              //     "bulletedList",
              //     "numberedList",
              //     "todoList",
              //     "|",
              //     "code",
              //     "codeBlock",
              //     "|",
              //     "insertTable",
              //     "|",
              //     "uploadImage",
              //     "blockQuote",
              //     "|",
              //     "undo",
              //     "redo",
              //   ],
              //   shouldNotGroupWhenFull: true,
              // },
            }}
            data={html}
            onReady={(editor) => {
              // You can store the "editor" and use when it is needed.
              console.log("Editor is ready to use!", editor);
            }}
            onChange={(event, editor) => {
              const data = editor.getData();
              setHtml(data);
            }}
          />
        </Grid>
        <Grid item xs={12}>
          {id === "them" ? (
            <LoadingButton
              loading={loadingAdd}
              type='submit'
              size='large'
              color='secondary'
              variant='contained'
              onClick={handleSubmit(handleAdd)}
            >
              Th??m tin t???c
            </LoadingButton>
          ) : (
            <LoadingButton
              loading={loadingUpdate}
              type='submit'
              size='large'
              color='secondary'
              variant='contained'
              onClick={handleSubmit(handleUpdate)}
            >
              C???p nh???t
            </LoadingButton>
          )}
        </Grid>
      </Grid>
    </>
  );
};

export default CkEditor;
