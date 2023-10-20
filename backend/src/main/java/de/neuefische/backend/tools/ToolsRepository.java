package de.neuefische.backend.tools;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ToolsRepository extends MongoRepository<Tool, String> {
}
