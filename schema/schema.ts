
import * as Yup from "yup"


export const schemaArticle = Yup.object().shape({
    title : Yup.string().trim().required("le titre est requise"),
    description : Yup.string().trim().required("le titre est requise"),
    image : Yup.string(),
})