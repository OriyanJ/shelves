import { Injectable } from "@angular/core";
import { HttpParams, HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";

@Injectable({ providedIn: 'root' })
export class BookService {
    constructor(private http: HttpClient) { }

    /**
     * Perform volumes search by a query.
     * @param query Search for volumes that contain this text string.
     * @param startIndex The position in the collection at which to start.
     * @param maxResults The maximum number of results to return.
     */
    public searchVolumes(query: string, startIndex = 0, maxResults = 20) {
        const url = `${environment.apiUrl}/volumes`
        let params = new HttpParams();
        params = params.append('q', query);
        params = params.append('startIndex', startIndex.toString());
        params = params.append('maxResults', maxResults.toString());
        return this.http.get(url, { params: params });
    }
}