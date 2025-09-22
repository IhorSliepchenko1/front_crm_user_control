type TError = {
  data: { message: string };
};

const hasErrorField = (err: TError) => {
  return (
    typeof err === `object` &&
    err !== null &&
    `data` in err &&
    typeof err.data === `object` &&
    err.data !== null &&
    `message` in err.data
  );
};

export const errorMessages = (err: any) => {
  console.log(err);

  return hasErrorField(err)
    ? err?.data?.message
    : err?.message ?? "Что-то пошло не так. Попробуйте снова.";
};
