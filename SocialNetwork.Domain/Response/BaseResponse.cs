namespace SocialNetwork.Domain.Response
{
    public class BaseResponse<T> : IBaseResponse<T>
    {
       public string Description { get; set; }
       public T Data { get; set; }
       public StatusCode StatusCode { get; set; }
    }

    public interface IBaseResponse<T>
    {
        string Description { set; }
        T Data { set; }
        StatusCode StatusCode { set; }
    }
}
