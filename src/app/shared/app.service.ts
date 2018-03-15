import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Headers, RequestOptions, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class AppService {
    constructor(private http: Http) { }

    /**
     * This method consumes the endpoint URL
      * @param {*} queryObject(Depending on the whether he has selected it becomes URL) 
     * @returns {Observable<any>} 
     * @memberof AppService
     */
    public getPublications(queryObject: any): Observable<any> {
        let params: URLSearchParams = new URLSearchParams();
        params.set('query', queryObject);
        params.set('format', 'json');
        params.set('resulttype', 'lite');
        let requestOptions = new RequestOptions();
        requestOptions.search = params;
        //https://www.ebi.ac.uk/europepmc/webservices/rest/search?query='malaria' 
        return this.http.get('https://www.ebi.ac.uk/europepmc/webservices/rest/search',requestOptions).map((response: any) => {
             response = Object.assign({}, this.getNumberOfPublicationPerYear(response.json()));
            return response;
        });
    }
    /**
     * This method extracts the response and fills up the HASH TABLE with year as key 
     *  others as value
     * @param {*} response 
     * @returns {*} noOfJournalsPerYear
     * @memberof AppService
     */
    public getNumberOfPublicationPerYear(response: any): any {
        let noOfJournalsPerYear = new Object();
        for (let journals of response['resultList']['result']) {
            if (noOfJournalsPerYear.hasOwnProperty(journals.pubYear.toString())) {
                noOfJournalsPerYear[journals.pubYear].noOfPublication += 1;
                if (journals.citedByCount > noOfJournalsPerYear[journals.pubYear].cite) {
                    noOfJournalsPerYear[journals.pubYear].cite = journals.citedByCount;
                    noOfJournalsPerYear[journals.pubYear].title = journals.title;
                }

            }
            else {
                let publicationsDetails = new Object();
                publicationsDetails['cite'] = journals.citedByCount;
                publicationsDetails['PublicationTitle'] = journals.title;
                publicationsDetails['noOfPublication'] = 1;
                publicationsDetails['year'] = journals.pubYear;
                noOfJournalsPerYear[journals.pubYear] = publicationsDetails;
            }

        }
        //See the comment(Function randomPublicationGenerator's) for the explanation of this
        noOfJournalsPerYear['2007'] = this.randomPublicationGenerator(16, 'sample-1', 13, '2007');
        noOfJournalsPerYear['2008'] = this.randomPublicationGenerator(6, 'sample-2', 2, '2008');
        noOfJournalsPerYear['2009'] = this.randomPublicationGenerator(13, 'sample-3', 3, '2009');
        noOfJournalsPerYear['2010'] = this.randomPublicationGenerator(5, 'sample-4', 12, '2010');
        noOfJournalsPerYear['2011'] = this.randomPublicationGenerator(3, 'sample-5', 8, '2011');
        noOfJournalsPerYear['2012'] = this.randomPublicationGenerator(7, 'sample-6', 11, '2012');
        noOfJournalsPerYear['2013'] = this.randomPublicationGenerator(1, 'sample-7', 4, '2013');
        noOfJournalsPerYear['2014'] = this.randomPublicationGenerator(3, 'sample-8', 7, '2014');
        noOfJournalsPerYear['2015'] = this.randomPublicationGenerator(2, 'sample-9', 6, '2015');
        noOfJournalsPerYear['2016'] = this.randomPublicationGenerator(3, 'sample-10', 8, '2016');
        noOfJournalsPerYear['2017'] = this.randomPublicationGenerator(6, 'sample-11', 10, '2017');
        return noOfJournalsPerYear;
    }
    /**
     * Assumption : Since the endpoint is not sending the other data 
     * I have created this to generate publication so as to display it the bar chart
     * @param {number} cite 
     * @param {string} title 
     * @param {number} noOfPublication 
     * @param {string} year 
     * @returns Object
     * @memberof AppService
     */
    public randomPublicationGenerator(cite: number, title: string, noOfPublication: number, year: string) {
        let sample = new Object();
        sample['cite'] = cite;
        sample['PublicationTitle'] = title;
        sample['noOfPublication'] = noOfPublication;
        sample['year'] = year;

        return sample;
    }
}
