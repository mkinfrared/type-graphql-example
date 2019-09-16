import { FormikActions, FormikBag } from "formik";

export type SubmitForm<V, P> = (values: V, formikBag: FormikBag<P, V>) => void;

export type HandleSubmit<V> = (
  values: V,
  formikActions: FormikActions<V>
) => void;
